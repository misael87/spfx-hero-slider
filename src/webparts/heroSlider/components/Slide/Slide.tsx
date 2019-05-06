import * as React from 'react';
import styles from './Slide.module.scss';
import ISlideProps from './ISlideProps';
import { truncateString } from '../../../../utils';

const Slide: React.StatelessComponent<ISlideProps> = ({
  title,
  description,
  category,
  ctaText,
  ctaUrl,
  imageUrl,
  active,
}) => {
  if (!active) return null;

  const backgroundStyles = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 50%',
  };

  return (
    <section className={styles.slide} style={backgroundStyles}>
      <div className={styles.headline}>
        <span className={styles.category}>{category}</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{truncateString(description)}</p>
        <a className={styles.cta} href={ctaUrl}>
          {ctaText}
        </a>
      </div>
    </section>
  );
};

export default Slide;
