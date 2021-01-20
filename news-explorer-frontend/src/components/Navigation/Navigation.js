import './Navigation.css';
import { NavLink } from 'react-router-dom';
import Button from '../Button/Button';
import logoutIconDark from '../../images/logout-icon-dark.svg';
import logoutIconLight from '../../images/logout-icon-light.svg';

function Navigation(props) {
  const {
    theme, isNavMenuOpened, isLoggedIn,
    openPopup,
    signOut, scrollToTop, toggleNavMenu, currentUser,
  } = props;
  const closeNavMenu = () => {
    toggleNavMenu(false);
    scrollToTop();
  };

  const handleNavButtonClick = () => {
    if (isLoggedIn) signOut();
    else {
      toggleNavMenu(false);
      openPopup('login');
    }
  };
  return (
        <nav
            className={`navigation navigation_theme_${theme} ${
              isNavMenuOpened ? 'navigation_visible' : ''
            }`}
        >
            <ul className="navigation__list">
                <li className="navigation__item">
                    <NavLink
                        to="/"
                        exact
                        className="navigation__link"
                        activeClassName={`navigation__link_active_theme_${theme}`}
                        onClick={closeNavMenu}
                    >
                        Home
                    </NavLink>
                </li>
                {isLoggedIn && (
                    <li className="navigation__item">
                        <NavLink
                            to="/saved-news"
                            className="navigation__link"
                            activeClassName={`navigation__link_active_theme_${theme}`}
                            onClick={closeNavMenu}
                        >
                            Bookmarks
                        </NavLink>
                    </li>
                )}
            </ul>
            <Button
                buttonClasses={`button_type_text navigation__button navigation__button_theme_${theme}`}
                onClick={handleNavButtonClick}>
                {isLoggedIn ? (
                    <span className="navigation__authorized-button">
            <span className="navigation__authorized-button-title">{currentUser.name}</span>
            <img
                className="navigation__logout-icon"
                src={theme === 'dark' ? logoutIconLight : logoutIconDark}
                alt='Log out'
            />
          </span>
                ) : 'Login'}
            </Button>
        </nav>
  );
}

export default Navigation;
