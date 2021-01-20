import './SavedNews.css';
import { useEffect } from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';

function SavedNews({
  setTheme,
  savedArticles,
  keywords,
}) {
  useEffect(() => {
    setTheme('light');
    return () => {
      setTheme('dark');
    };
  }, [setTheme]);

  return (

        <section className="saved-news">
            <SavedNewsHeader
                savedArticles={savedArticles}
                keywords={keywords}
            />
            <NewsCardList cards={savedArticles} type='bookmarks'/>
        </section>

  );
}

export default SavedNews;
