import React, { useContext } from 'react';
import styles from './OverviewCalendar.module.css';

import { CalendarContext } from '@/pages/index';

import { NavigationArrow } from '../NavigationArrow';

export const OverviewCalendar = () => {
  const { calendarOverview, handleSelectedOverviewMonth, selectedOverviewDate, handleSelectedBoardDate, checkIsToday } =
    useContext(CalendarContext);

  const days: Array<string> = ['日', '月', '火', '水', '木', '金', '土'];

  return (
    <div className={styles.overview_calendar}>
      <div className={styles.overview_calendar_elements}>
        <div className={styles.week}>
          {days.map((day) => {
            return <h4 key={day}>{day}</h4>;
          })}
        </div>
        <div className={styles.elements}>
          {calendarOverview.map((cb, idx) => {
            return (
              <h4
                key={idx}
                onClick={() => handleSelectedBoardDate(cb)}
                className={[styles.element, checkIsToday(cb) ? styles.today : ''].join(' ')}
              >
                {cb.date}
              </h4>
            );
          })}
        </div>
      </div>
    </div>
  );
};
