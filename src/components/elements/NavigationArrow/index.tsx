import React from 'react';
import styles from './NavigationArrow.module.css';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type ComponentProps = {
  size: string;
};

export const NavigationArrow: React.FC<ComponentProps> = ({ size }) => {
  let font_size: string;
  switch (size) {
    case 'large':
      font_size = styles.large;
      break;
    case 'medium':
      font_size = styles.medium;
      break;
    case 'small':
      font_size = styles.small;
      break;
    default:
      font_size = styles.medium;
      break;
  }

  return (
    <div className={styles.arrow}>
      <div className={styles.arrow_button}>
        <ArrowBackIosIcon className={[font_size].join(' ')} />
      </div>
      <div className={styles.arrow_button}>
        <ArrowForwardIosIcon className={[styles.arrow_button, font_size].join(' ')} />
      </div>
    </div>
  );
};
