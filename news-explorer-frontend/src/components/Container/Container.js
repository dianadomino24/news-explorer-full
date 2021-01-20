import './Container.css';

function Container({ classes, children }) {
  return <div className={`container ${classes}`}>{children}</div>;
}

export default Container;
