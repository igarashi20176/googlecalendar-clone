import React from 'react';
import styles from './NavigationArrow.module.css';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type ComponentProps = {
  size: string;
  handleSelectedMonth: (step: number) => void;
};

export const NavigationArrow: React.FC<ComponentProps> = ({ size, handleSelectedMonth }) => {
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

  const handleDateFormer = () => handleSelectedMonth(-1);
  const handleDateNext = () => handleSelectedMonth(1);

  return (
    <div className={styles.arrow}>
      <span onClick={handleDateFormer}>
        <ArrowBackIosIcon className={[styles.arrow_button, font_size].join(' ')} />
      </span>
      <span onClick={handleDateNext}>
        <ArrowForwardIosIcon className={[styles.arrow_button, font_size].join(' ')} />
      </span>
    </div>
  );
};
