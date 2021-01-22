import './App.css';
import { useState, useEffect, useCallback } from 'react';
import {
  Redirect, Route, Switch, useHistory,
} from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Main from '../Main/Main';
import Header from '../Header/Header';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Overlay from '../Overlay/Overlay';
import * as auth from '../../utils/auth';
import { getToken, removeToken, setToken } from '../../utils/token';
import mainApi from '../../utils/MainApi';
import newsApi from '../../utils/NewsApi';
import notFoundImg from '../../images/not-found-icon.svg';

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: '', _id: null, email: '', password: '',
  });
  const [openedPopup, setOpenedPopup] = useState('');
  const [theme, setTheme] = useState('dark');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isNavMenuOpened, setIsNavMenuOpened] = useState(false);
  const history = useHistory();
  // const [cards, setCards] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [searchState, setSearchState] = useState('');
  const [errorTotal, setErrorTotal] = useState('');
  const [localData, setLocalData] = useState([]);

  const saveToLocalStorage = (data) => {
    localStorage.setItem('localNews', JSON.stringify({ data }));
  };

  const removeFromLocalStorage = () => {
    localStorage.removeItem('localNews');
  };

  const checkStorage = useCallback(() => {
    if (localStorage.getItem('localNews')) {
      const { data } = JSON.parse(localStorage.getItem('localNews'));
      setLocalData(data);
      setSearchState('found');
    } else { setSearchState(''); }
  }, [setLocalData]);

  const openPopup = (popup) => {
    setOpenedPopup(popup);
  };

  const toggleNavMenu = (value) => {
    setIsNavMenuOpened(value);
  };

  const closePopup = () => {
    toggleNavMenu(false);
    setOpenedPopup('');
  };

  function signOut() {
    removeToken();
    setLocalData([]);
    setSearchState('');
    setOpenedPopup('');
    removeFromLocalStorage();
    setLoggedIn(false);
    history.push('/sign-in');
  }

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleLogin = (email, password, resetForm) => {
    auth
      .authorize(email, password)
      .then((data) => {
        if (!data) {
          setErrorTotal('Something went wrong on authorization');
          return false;
        }
        if (data.token) {
          // eslint-disable-next-line no-console
          setToken(data.token);
          setErrorTotal('');
          resetForm();
          setCurrentUser({ email: data.email, name: data.name });
          setLoggedIn(true);
          setOpenedPopup('');
          history.push('/');
          return isLoggedIn;
        }
        throw new Error('Something went wrong on authorization');
      })
      .catch((err) => {
        setErrorTotal(`${err.message}`);

        if (err.status === 401) {
          // eslint-disable-next-line no-console
          return console.log(`User with this email is not found : ${err}`);
        }
        if (err.status === 400) {
          // eslint-disable-next-line no-console
          return console.log(`One of the inputs is not filled in : ${err}`);
        }
        // eslint-disable-next-line no-console
        return console.log(`App authorize Error: ${err.message}`);
      });
  };
  const handleRegister = (email, password, resetForm, name) => {
    auth
      .register(email, password, name)
      .then((res) => {
        if (res) {
          setErrorTotal('');
          resetForm();
          setOpenedPopup('register-success');
          history.push('/sign-in');
        }
      })
      .catch((err) => {
        setErrorTotal(`${err.message}`);
        // eslint-disable-next-line no-console
        console.log(`App onRegister: ${err.message}`);
      });
  };
  const setUser = (evt) => {
    const { target } = evt;
    const { name, value } = target;
    setCurrentUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  useEffect(() => {
    checkStorage();
  }, [checkStorage, history]);

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          setCurrentUser(res);
          setLoggedIn(true);
          history.push('/');
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(`getContent: ${err}`);
        });
    }
  }, [isLoggedIn, history]);
  // const tokenCheck = () => {
  //   const jwt = getToken();
  //
  //   if (!jwt) {
  //     return;
  //   }
  //
  //   auth
  //     .getContent(jwt)
  //     .then((res) => {
  //       if (res) {
  //         setLoggedIn(true);
  //         setCurrentUser((prevUser) => ({ ...prevUser, name: res.name }));
  //         history.push('/');
  //       }
  //     })
  //     .catch((err) => {
  //       // eslint-disable-next-line no-console
  //       console.log(`getContent: ${err}`);
  //     });
  // };
  // // will check token on element mounting and route changing
  // useEffect(() => {
  //   tokenCheck();
  // }, [isLoggedIn, history]);

  const handleSearch = (keyword) => {
    setSearchState('searching');
    newsApi.getArticles(keyword)
      .then((data) => {
        if (data.articles.length === 0) {
          setSearchState('notFound');
          return;
        }
        const articles = data.articles.map((item) => ({
          keyword,
          title: item.title,
          text: item.description,
          date: item.publishedAt,
          source: item.source.name,
          link: item.url,
          image: item.urlToImage || notFoundImg,
        }));
        saveToLocalStorage(articles);
        setLocalData(articles);
        setSearchState('found');
        // setCards(articles);
      })
      .catch((err) => {
        setSearchState('error');
        // eslint-disable-next-line no-console
        console.log(`handleSearch: ${err}`);
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getItems('/articles')
        .then((res) => {
          setSavedArticles(res);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(`getSavedArticles: ${err}`);
        });
    }
  }, [isLoggedIn, history]);

  const handleDeleteArticle = (id) => {
    mainApi.deleteArticle(id)
      .then((res) => setSavedArticles(savedArticles.filter((item) => item._id !== res._id)))
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(`On article delete: ${err}`);
      });
  };
  const handleSaveArticle = (card) => {
    mainApi
      .saveArticle(card)
      .then((item) => setSavedArticles([item, ...savedArticles]))
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(`On article save: ${err}`);
      });
  };
  return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="app">
                <Header
                    theme={theme}
                    isLoggedIn={isLoggedIn}
                    openPopup={openPopup}
                    openedPopup={openedPopup}
                    signOut={signOut}
                    isNavMenuOpened={isNavMenuOpened}
                    scrollToTop={scrollToTop}
                    toggleNavMenu={toggleNavMenu}
                    currentUser={currentUser}
                />
                {isNavMenuOpened && <Overlay closePopup={closePopup}/>}

                <PopupWithForm
                    openedPopup={openedPopup}
                    openPopup={openPopup}
                    closePopup={closePopup}
                    handleLogin={handleLogin}
                    handleRegister={handleRegister}
                    errorTotal={errorTotal}
                    setErrorTotal={setErrorTotal}
                    onChange={setUser}
                />

                <Switch>
                    <ProtectedRoute
                        path="/saved-news"
                        isLoggedIn={isLoggedIn}
                        component={SavedNews}
                        setTheme={setTheme}
                        savedArticles={savedArticles}
                        handleSaveArticle={handleSaveArticle}
                        handleDeleteArticle={handleDeleteArticle}
                    />

                    <Route exact path="/">
                        <Main
                            isLoggedIn={isLoggedIn}
                            cards={localData}
                            searchState={searchState}
                            setSearchState={setSearchState}
                            handleSearch={handleSearch}
                            handleSaveArticle={handleSaveArticle}
                            handleDeleteArticle={handleDeleteArticle}
                            savedArticles={savedArticles}
                            // localData={localData}
                            // setLocalData={setLocalData}
                        />
                    </Route>

                    <Route path="*">
                        <Redirect to="/"/>
                    </Route>
                </Switch>

                <Footer scrollToTop={scrollToTop}/>
            </div>
        </CurrentUserContext.Provider>
  );
}

export default App;
