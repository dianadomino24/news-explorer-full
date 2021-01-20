import './NewsCard.css';
import { useRef, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Button from '../Button/Button';
import InfoDetail from '../InfoDetail/InfoDetail';
import notFoundImg from '../../images/not-found-icon.svg';

function NewsCard({
  card, isLoggedIn, handleSaveArticle,
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

  const [isSaved, setIsSaved] = useState(false);

  const showDetail = () => {
    infoDetail.current.classList.add('info-detail_visible');
  };
  const hideDetail = () => {
    infoDetail.current.classList.remove('info-detail_visible');
  };

  const handleSave = () => {
    button.current.blur();
    setIsSaved(!isSaved);
    handleSaveArticle(card);
  };

  const dateToFormat = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const dateFormatted = dateToFormat.toLocaleString('en-US', options);
  return (
        <li className="news-card" ref={cardElement}>
            {image ? <img
                    className="news-card__image"
                    src={image}
                    alt={title}
                />
              : <img
                    className="news-card__image news-card__image_not-found"
                    src={notFoundImg}
                    alt={title}
                />}
            <Switch>
                <Route path="/saved-news">
                    {keyword && <p className="news-card__keyword">{keyword}</p>}
                    <InfoDetail classes='' refObj={infoDetail}>
                        Remove from bookmarks
                    </InfoDetail>
                    <Button
                        onMouseEnter={showDetail}
                        onMouseLeave={hideDetail}
                        // onClick={handleRemove}
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
                        onClick={isLoggedIn ? handleSave : undefined}
                    />
                </Route>
            </Switch>

            <div className="news-card__info">
                <a
                    href={link}
                    className="news-card__link"
                    target="_blank"
                    rel="noreferrer"
                >
                    <time className="news-card__date" dateTime={date}>{dateFormatted}</time>
                    <h3 className="news-card__title">{title}</h3>
                    <p className="news-card__text">{text}</p>
                    <p className="news-card__source">{source}</p>
                </a>
            </div>
        </li>
  );
}

export default NewsCard;
