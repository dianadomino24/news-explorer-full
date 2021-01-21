import './SavedNews.css';
import { useEffect } from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';

function SavedNews({
  setTheme,
  savedArticles,
  ...props
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
            />
            <NewsCardList cards={savedArticles} savedArticles={savedArticles} {...props} type='bookmarks'/>
        </section>

  );
}

export default SavedNews;
