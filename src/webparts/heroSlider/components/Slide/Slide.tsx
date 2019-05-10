import * as React from 'react';
import styles from './Slide.module.scss';
import SlideProps from './SlideProps';
import { truncateString } from '../../../../utils';

const Slide: React.StatelessComponent<SlideProps> = ({
  title,
  description,
  categories,
  ctaButton,
  imageUrl,
  isActive,
}) => {
  if (!isActive) return null;

  const backgroundStyles = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 50%',
  };

  const renderCategories = () => {
    if (!categories) return null;

    return (
      categories
        // convert to array
        .split(', ')
        // get unique values
        .filter((value, index, self) => self.indexOf(value) === index)
        .map(category => {
          return (
            <span key={category} className={styles.category}>
              {category}
            </span>
          );
        })
    );
  };

  return (
    <section className={styles.slide} style={backgroundStyles}>
      <div className={styles.headline}>
        {renderCategories()}
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{truncateString(description)}</p>
        <a className={styles.cta} href={ctaButton.url}>
          {ctaButton.text}
        </a>
      </div>
    </section>
  );
};

export default Slide;
