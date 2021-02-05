import './About.css';
import Container from '../Container/Container';
import author from '../../images/diana.jpg';
import { texts } from '../../utils/constants';
import SectionTitle from '../SectionTitle/SectionTitle';

function About() {
  return (
        <Container>
            <section className="about">
                <img className="about__photo" src={author} alt='Author avatar'/>
                <div className="about__description">
                    <SectionTitle classes='about__title' title='About me'/>
                    <p className="about__text">
                        {texts.aboutDescription1}
                    </p>
                    <p className="about__text">
                        {texts.aboutDescription2}
                    </p>
                </div>

            </section>
        </Container>
  );
}

export default About;
