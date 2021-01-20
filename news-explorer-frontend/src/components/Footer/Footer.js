import './Footer.css';
import { Link } from 'react-router-dom';
import Container from '../Container/Container';
import gitIcon from '../../images/git.svg';
import linkedinIcon from '../../images/linked-in.svg';

function Footer(props) {
  return (
        <Container>
            <footer className='footer'>
                <p className="footer__copyright">
                    &#169; 2020 Diana Vlasenkova, Powered by News API
                </p>
                <div className="footer__links">
                    <nav className="footer__nav">
                        <ul className="footer__nav-list">
                            <li className="footer__nav-item">
                                <Link to="/" onClick={props.scrollToTop} className="footer__nav-link">
                                    Home
                                </Link>
                            </li>
                            <li className="footer__nav-item">
                                <a
                                    className="footer__nav-link"
                                    href='https://practicum.yandex.com/'
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Yandex.Practicum
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <ul className="footer__social">
                        <li className="footer__social-item">
                            <a
                                className="footer__social-link"
                                href="https://github.com/dianadomino24/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img src={gitIcon} alt="GitHub"/>
                            </a>
                        </li>
                        <li className="footer__social-item">
                            <a
                                className="footer__social-link"
                                href="https://www.linkedin.com/in/diana-vlasenkova/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img src={linkedinIcon} alt="LinkedIn"/>
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
        </Container>
  );
}

export default Footer;
