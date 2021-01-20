import './Banner.css';
import Container from '../Container/Container';
import SearchForm from '../SearchForm/SearchForm';

function Banner(props) {
  return (
        <section className="banner">
            <Container>
                <div className="banner__container">
                    <div className="banner__text">
                        <h1 className="banner__title">
                            What's going on in the world?
                        </h1>
                        <p className="banner__description">
                            Find the latest articles on any topic and save them to your bookmarks.
                        </p>
                    </div>
                    <SearchForm {...props} />
                </div>
            </Container>
        </section>
  );
}

export default Banner;
