import './Overlay.css';

function Overlay({ closePopup }) {
  return (
        <div
            className="overlay"
            onClick={closePopup}
        />
  );
}

export default Overlay;
