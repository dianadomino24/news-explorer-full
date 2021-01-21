import './SavedNewsHeader.css';
import { useContext, useState, useEffect } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import SectionTitle from '../SectionTitle/SectionTitle';
import Container from '../Container/Container';

function SavedNewsHeader({ savedArticles }) {
  const currentUser = useContext(CurrentUserContext);

  const [keywords, setKeywords] = useState([]);

  const sortByFrequency = (arr) => {
    const frequency = {};
    arr.forEach((item) => {
      frequency[item] = 0;
    });
    const uniqueKeywords = arr.filter((item) => {
      frequency[item] += 1;
      return frequency[item] === 1;
    });
    return uniqueKeywords.sort((a, b) => frequency[b] - frequency[a]);
  };

  useEffect(() => {
    const savedKeywords = savedArticles.map((article) => article.keyword[0].toUpperCase()
      + article.keyword.slice(1));
    setKeywords(sortByFrequency(savedKeywords));
  }, [savedArticles]);

  return (
        <Container>
            <div className="saved-news-header">
                <p className="saved-news-header__heading">Bookmarks</p>
                <SectionTitle
                    classes="saved-news-header__title"
                    title={
                        `${currentUser.name}, you have ${
                          savedArticles.length
                        } saved articles `
                    }
                />
              {keywords.length > 0
              && <p className="saved-news-header__keywords-para">
                {'on these keywords: '}
                <span className="saved-news-header__keyword">
                 {keywords.length > 3 ? `${keywords[0]}, ${keywords[1]} and ${keywords.length - 2} other ones` : `${keywords.join(', ')}`}</span>
              </p>
              }
            </div>
        </Container>
  );
}

export default SavedNewsHeader;
