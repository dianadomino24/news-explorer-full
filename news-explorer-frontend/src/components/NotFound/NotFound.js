import './NotFound.css';
import notFoundIcon from '../../images/not-found-icon.svg';

function NotFound() {
  return (
        <div className="not-found">
            <img
                className="not-found__icon"
                src={notFoundIcon}
                alt="Not found"
            />
            <h2 className="not-found__title">
                Not found
            </h2>
            <p className="not-found__text">
                Unfortunately, nothing was found for your search query.
            </p>
        </div>
  );
}

export default NotFound;
