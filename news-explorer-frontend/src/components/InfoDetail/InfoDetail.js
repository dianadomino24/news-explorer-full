import './InfoDetail.css';

function InfoDetail({ classes, refObj, children }) {
  return (
        <div className={`info-detail ${classes}`} ref={refObj}>
            {children}
        </div>
  );
}

export default InfoDetail;
