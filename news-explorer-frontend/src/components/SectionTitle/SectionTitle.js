import './SectionTitle.css';

function SectionTitle({ classes, title }) {
  return <h2 className={`section-title ${classes}`}>{title}</h2>;
}

export default SectionTitle;
