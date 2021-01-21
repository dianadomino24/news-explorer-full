import './NotFound.css';
import notFoundIcon from '../../images/not-found-icon.svg';

function NotFound({ type }) {
  return (
        <div className="not-found">
            <img
                className="not-found__icon"
                src={notFoundIcon}
                alt="Not found"
            />
           <h2 className="not-found__title">
             {type === 'notfound' ? 'Not found' : 'Server error'}
            </h2>
            <p className="not-found__text">
              {type === 'notfound' ? 'Unfortunately, nothing was found for your search query.'
                : 'Unfortunately, an error occurred during the request. There may be a connection problem or the server is unavailable. Wait a bit and try again.'}
            </p>
        </div>
  );
}

export default NotFound;
