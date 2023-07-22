import React from 'react';
import styles from './NavigationArrow.module.css';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type Props = {
  size: string;
  handleSelectedDate: (step: number) => void;
};

export const NavigationArrow: React.FC<Props> = ({ size, handleSelectedDate }) => {
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
    case 'tiny':
      font_size = styles.tiny;
      break;
    default:
      font_size = styles.medium;
      break;
  }

  const handleDatePrev = () => handleSelectedDate(-1);
  const handleDateNext = () => handleSelectedDate(1);

  return (
    <div className={styles.arrows}>
      <span onClick={handleDatePrev}>
        <ArrowBackIosIcon className={[styles.arrow_button, font_size].join(' ')} />
      </span>
      <span onClick={handleDateNext}>
        <ArrowForwardIosIcon className={[styles.arrow_button, font_size].join(' ')} />
      </span>
    </div>
  );
};
