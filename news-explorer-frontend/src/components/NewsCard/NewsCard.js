import './NewsCard.css';
import { useRef } from 'react';
import { Route, Switch } from 'react-router-dom';
import Button from '../Button/Button';
import InfoDetail from '../InfoDetail/InfoDetail';
import notFoundImg from '../../images/not-found-icon.svg';

function NewsCard({
  card, isLoggedIn,
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

  const showDetail = () => {
    infoDetail.current.classList.add('info-detail_visible');
  };
  const hideDetail = () => {
    infoDetail.current.classList.remove('info-detail_visible');
  };

  const handleSave = () => {
    button.current.blur();
    button.current.classList.toggle('button_type_icon_bookmark_saved');
  };
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
                    <Button
                        forwardedRef={button}
                        onMouseEnter={isLoggedIn ? null : showDetail}
                        onMouseLeave={isLoggedIn ? null : hideDetail}
                        buttonClasses="button_type_icon button_type_icon_bookmark_regular"
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
                    <time className="news-card__date" dateTime={date}>{date}
                    </time>
                    <h3 className="news-card__title">{title}</h3>
                    <p className="news-card__text">{text}</p>
                    <p className="news-card__source">{source}</p>
                </a>
            </div>
        </li>
  );
}

export default NewsCard;
