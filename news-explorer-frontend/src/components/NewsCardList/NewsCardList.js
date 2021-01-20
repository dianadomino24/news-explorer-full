import './NewsCardList.css';
import Container from '../Container/Container';
import Button from '../Button/Button';
import NewsCard from '../NewsCard/NewsCard';
import SectionTitle from '../SectionTitle/SectionTitle';

function NewsCardList({
  type,
  cards,
  ...props
}) {
  return (
        <section className="news">
            <Container>
                {type === 'search' && <SectionTitle classes='news__title' title='Search results'/>}
                <ul className="news__list">
                    {cards.map((card) => (
                        <NewsCard
                            key={card._id}
                            card={card}
                            {...props}
                        />
                    ))}
                </ul>
                {type === 'search' && cards.length > 3 ? (
                    <Button
                        buttonClasses="button_type_text button_type_more news__button-more"
                        // onClick={showMore}
                    >
                        Show more
                    </Button>
                ) : ''}

            </Container>
        </section>

  );
}

export default NewsCardList;
