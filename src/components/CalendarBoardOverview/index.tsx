import React from 'react';
import styles from './CalendarBoardOverview.module.css';

import { NavigationArrow } from '@/components/elements/NavigationArrow';

export const CalendarBoardOverview = () => {
  const days: Array<string> = ['日', '月', '火', '水', '木', '金', '土'];

  return (
    <div className={styles.overview}>
      <div className={styles.overview_calendar}>
        <div className={styles.overview_calendar_navigation}>
          <h3>2023 年 6 月 1 日</h3>
          <div className={styles.overview_arrow}>
            <NavigationArrow size='medium' />
          </div>
        </div>
        <div className={styles.overview_calendar_elements}>
          <div className={styles.week}>
            {days.map((day) => {
              return <h4>{day}</h4>;
            })}
          </div>
          <div className={styles.elements}>
            {new Array(35).fill(0).map((_, i) => {
              return <h4 className={styles.element}>{i}</h4>;
            })}
          </div>
        </div>
      </div>
      <div className={styles.overview_options}>
        <p>options</p>
      </div>
    </div>
  );
};
