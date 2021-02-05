import './NewsCardList.css';
import { useState } from 'react';
import Container from '../Container/Container';
import Button from '../Button/Button';
import NewsCard from '../NewsCard/NewsCard';
import SectionTitle from '../SectionTitle/SectionTitle';

function NewsCardList({
  type,
  cards,
  savedArticles,
  ...props
}) {
  const [quantity, setQuantity] = useState(3);

  const showMore = () => {
    setQuantity(quantity + 3);
  };
  return (
        <section className="news">
            <Container>
                {type === 'search' && <SectionTitle classes='news__title' title='Search results'/>}
              {type === 'bookmarks' && <ul className="news__list">
                    {savedArticles.map((card) => (
                        <NewsCard
                            key={card._id}
                            card={card}
                            {...props}
                        />
                    ))}
                </ul>}
              {type === 'search' && <ul className="news__list">
                {cards.slice(0, quantity).map((card) => (
                  <NewsCard
                    key={card._id || Math.random()}
                    card={card}
                    savedArticles={savedArticles}

                    {...props}
                  />
                ))}
              </ul>}
                {type === 'search' && quantity < cards.length ? (
                    <Button
                        buttonClasses="button_type_text button_type_more news__button-more"
                        onClick={showMore}
                    >
                        Show more
                    </Button>
                ) : ''}

            </Container>
        </section>

  );
}

export default NewsCardList;
