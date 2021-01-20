import './Hamburger.css';

function Hamburger({ theme, isNavMenuOpened, toggleNavMenu }) {
  const handleHambClick = () => {
    toggleNavMenu(!isNavMenuOpened);
  };
  return (
        <button
            className={`hamburger hamburger_theme_${theme} ${
              isNavMenuOpened ? 'hamburger_cross' : 'hamburger_bar'
            }`}
            onClick={handleHambClick}
        />
  );
}

export default Hamburger;
