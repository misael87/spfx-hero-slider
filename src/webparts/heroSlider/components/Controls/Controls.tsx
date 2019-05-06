import * as React from 'react';
import styles from './Controls.module.scss';
import { IControlsProps } from './IControlsProps';

const Controls: React.StatelessComponent<IControlsProps> = ({
  goPrevious,
  goNext,
}) => {
  return (
    <nav className={styles.controls}>
      <button type="button" className={styles.arrowLeft} onClick={goPrevious} />
      <button type="button" className={styles.arrowRight} onClick={goNext} />
    </nav>
  );
};

export default Controls;
