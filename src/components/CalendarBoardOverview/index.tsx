import React from 'react';
import styles from './CalendarBoardOverview.module.css';

export const CalendarBoardOverview = () => {
  return (
    <div className={styles.overview}>
      <div className={styles.overview_calendar}>
        <p>calendar</p>
      </div>
      <div className={styles.overview_options}>
        <p>options</p>
      </div>
    </div>
  );
};
