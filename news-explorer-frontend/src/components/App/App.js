import './App.css';
import { useState, useEffect } from 'react';
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
import { initialCards } from '../../utils/constants';
import * as auth from '../../utils/auth';
import { getToken, removeToken, setToken } from '../../utils/token';
// import mainApi from '../../utils/MainApi';
import newsApi from '../../utils/NewsApi';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [currentUser, setCurrentUser] = useState({
    name: 'Leo', _id: null, email: '', password: '',
  });
  const [openedPopup, setOpenedPopup] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [theme, setTheme] = useState('dark');
  const [isLoggedIn, setLoggedIn] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isNavMenuOpened, setIsNavMenuOpened] = useState(false);
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const [cards, setCards] = useState(initialCards);
  // eslint-disable-next-line no-unused-vars
  const [keywords, setKeywords] = useState(['Nature', 'Birds', 'Travel', 'Sea']);
  // eslint-disable-next-line no-unused-vars
  const [savedArticles, setSavedArticles] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [searchState, setSearchState] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [errorTotal, setErrorTotal] = useState('');

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
          return console.log(`User with this email is not found : ${err}`);
        }
        if (err.status === 400) {
          return console.log(`One of the inputs is not filled in : ${err}`);
        }
        return console.log(`App authorize Error: ${err.message}`);
      });
  };
  const handleRegister = (email, password, resetForm, name) => {
    auth
      .register(email, password, name)
      .then((res) => {
        if (res) {
          console.log(res);
          setErrorTotal('');
          resetForm();
          setOpenedPopup('register-success');
          history.push('/sign-in');
        }
      })
      .catch((err) => {
        setErrorTotal(`${err.message}`);
        console.log(`App onRegister: ${err.message}`);
      });
  };
  const setUser = (evt) => {
    const { target } = evt;
    const { name, value } = target;
    setCurrentUser((prevUser) => ({ ...prevUser, [name]: value }));
  };
  const tokenCheck = () => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    auth
      .getContent(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser((prevUser) => ({ ...prevUser, name: res.name }));
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(`getContent: ${err}`);
      });
  };
  // will check token on element mounting and route changing
  useEffect(() => {
    tokenCheck();
  }, [isLoggedIn, history]);

  const handleSearch = (keyword) => {
    setSearchState('searching');
    newsApi.getArticles(keyword)
      .then((data) => {
        console.log(data);
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
          image: item.urlToImage,
        }));
        setSearchState('found');
        setCards(articles);
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
                        keywords={keywords}
                    />

                    <Route exact path="/">
                        <Main
                            isLoggedIn={isLoggedIn}
                            cards={cards}
                            searchState={searchState}
                            setSearchState={setSearchState}
                            handleSearch={handleSearch}
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
