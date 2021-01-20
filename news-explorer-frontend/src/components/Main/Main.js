import './Main.css';
import About from '../About/About';
import Banner from '../Banner/Banner';
import NewsCardList from '../NewsCardList/NewsCardList';
import NotFound from '../NotFound/NotFound';
import Preloader from '../Preloader/Preloader';

function Main({ searchState, ...props }) {
  return (
        <main className="main">
            <Banner {...props} />
            {searchState === 'searching' && <Preloader/>}
            {searchState === 'notFound' && <NotFound/>}
            {searchState === 'found' && (
                <NewsCardList
                    type='search'
                    {...props}
                >
                </NewsCardList>
            )}
            <About/>
        </main>
  );
}

export default Main;
