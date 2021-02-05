import './NewsCard.css';
import { useRef, useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Button from '../Button/Button';
import InfoDetail from '../InfoDetail/InfoDetail';
import notFoundImg from '../../images/not-found-icon.svg';

function NewsCard({
  card, isLoggedIn, savedArticles, handleSaveArticle, handleDeleteArticle,
}) {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = card;
  const cardElement = useRef();
  const button = useRef();
  const infoDetail = useRef();

  const [isSaved, setIsSaved] = useState(null);

  function setCardBlue() {
    setIsSaved(true);
  }

  useEffect(() => {
    if (savedArticles) {
      const savedCard = savedArticles.find((i) => i.title === card.title && i.link === card.link);
      if (savedCard) {
        setCardBlue();
        setIsSaved(savedCard);
      }
    }
  }, []);

  const showDetail = () => {
    infoDetail.current.classList.add('info-detail_visible');
  };
  const hideDetail = () => {
    infoDetail.current.classList.remove('info-detail_visible');
  };
  const handleTrashClick = () => {
    handleDeleteArticle(card._id);
  };

  const handleSaveClick = () => {
    if (!isSaved) {
      handleSaveArticle(card);
    }
    if (isSaved) {
      handleDeleteArticle(isSaved._id);
    }
  };

  // when access to img src is forbidden (403)
  const handleImgError = (e) => {
    e.target.src = notFoundImg;
    e.target.className = 'news-card__image news-card__image_not-found';
  };

  const dateToFormat = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const dateFormatted = dateToFormat.toLocaleString('en-US', options);
  return (
        <li className="news-card" ref={cardElement}>
          <a
            href={link}
            className="news-card__link"
            target="_blank"
            rel="noreferrer"
          >
            {image ? <img
                    className="news-card__image"
                    src={image}
                    alt={title}
                    onError={handleImgError}
              />
              : <img
                    className="news-card__image news-card__image_not-found"
                    src={notFoundImg}
                    alt={title}
                />}
          </a>
            <Switch>
                <Route path="/saved-news">
                    {keyword && <p className="news-card__keyword">{keyword}</p>}
                    <InfoDetail classes='' refObj={infoDetail}>
                        Remove from bookmarks
                    </InfoDetail>
                    <Button
                        onMouseEnter={showDetail}
                        onMouseLeave={hideDetail}
                        onClick={handleTrashClick}
                        buttonClasses="button_type_icon button_type_icon_trash "
                    />
                </Route>
                <Route path="/">
                    {!isLoggedIn && (
                        <InfoDetail classes='' refObj={infoDetail}>
                          Log in to add bookmarks
                        </InfoDetail>
                    )}
                  {isLoggedIn && (
                    <InfoDetail classes='' refObj={infoDetail}>
                      {isSaved ? 'Remove from favorites' : 'Add to favourites'}
                    </InfoDetail>
                  )}
                  <Button
                        forwardedRef={button}
                        onMouseEnter={showDetail}
                        onMouseLeave={hideDetail}
                        buttonClasses={`button_type_icon ${isSaved ? 'button_type_icon_bookmark_saved' : 'button_type_icon_bookmark_regular'} `}
                        onClick={isLoggedIn ? handleSaveClick : undefined}
                    />
                </Route>
            </Switch>

            <div className="news-card__info">
                    <time className="news-card__date" dateTime={date}>{dateFormatted}</time>
                    <h3 className="news-card__title">{title}</h3>
                    <p className="news-card__text">{text}</p>
                    <a href={link}
                       target="_blank"
                       rel="noreferrer" className="news-card__source">{source}</a>

            </div>
        </li>
  );
}

export default NewsCard;
