import './Header.css';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useRef } from 'react';
import Logo from '../Logo/Logo';
import Container from '../Container/Container';
import Hamburger from '../Hamburger/Hamburger';
import Navigation from '../Navigation/Navigation';

function Header(props) {
  const {
    theme, openedPopup, isNavMenuOpened, scrollToTop,
  } = props;
  const header = useRef(null);

  const blurHeader = useCallback(() => {
    if (window.scrollY > 56) {
      header.current.classList.add('header_blurred');
    } else if (window.scrollY < 56) {
      header.current.classList.remove('header_blurred');
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', blurHeader);
    return () => window.removeEventListener('scroll', blurHeader);
  }, [blurHeader]);

  return (
        <header
            ref={header}
            className={`header header_theme_${theme} ${
              isNavMenuOpened ? '' : 'header_transparent'
            }`}
        >
            <Container>
                <div className={'header__container'}>
                    <Link className="header__logo" to="/" onClick={scrollToTop}>
                        <Logo/>
                    </Link>
                    {!openedPopup && <Hamburger {...props} />}
                    <Navigation {...props} />
                </div>
            </Container>
        </header>
  );
}

export default Header;
