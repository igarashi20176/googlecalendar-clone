import React from 'react';
import styles from './OverviewCalendar.module.css';

import { NavigationArrow } from '../NavigationArrow';

export const OverviewCalendar = () => {
  const days: Array<string> = ['日', '月', '火', '水', '木', '金', '土'];

  return (
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
            return <h4 key={day}>{day}</h4>;
          })}
        </div>
        <div className={styles.elements}>
          {new Array(35).fill(0).map((_, i) => {
            return (
              <h4 key={i} className={styles.element}>
                {i}
              </h4>
            );
          })}
        </div>
      </div>
    </div>
  );
};
