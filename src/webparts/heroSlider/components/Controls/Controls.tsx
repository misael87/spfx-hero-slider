import * as React from 'react';
import styles from './Controls.module.scss';
import { ControlsProps } from './ControlsProps';

const Controls: React.StatelessComponent<ControlsProps> = ({
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