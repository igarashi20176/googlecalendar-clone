import React, { useContext } from 'react';
import styles from './OverviewCalendar.module.css';

import { CalendarContext } from '@/pages/index';

import { NavigationArrow } from '../NavigationArrow';

export const OverviewCalendar = () => {
  const { calendarBoard, handleSelectedMonth, selectedDate } = useContext(CalendarContext);

  const days: Array<string> = ['日', '月', '火', '水', '木', '金', '土'];

  return (
    <div className={styles.overview_calendar}>
      <div className={styles.overview_calendar_navigation}>
        <h4>
          {selectedDate.year} 年 {selectedDate.month + 1} 月
        </h4>
        <div className={styles.overview_arrow}>
          <NavigationArrow handleSelectedMonth={handleSelectedMonth} size='small' />
        </div>
      </div>

      <div className={styles.overview_calendar_elements}>
        <div className={styles.week}>
          {days.map((day) => {
            return <h4 key={day}>{day}</h4>;
          })}
        </div>
        <div className={styles.elements}>
          {calendarBoard.map((cb, idx) => {
            return (
              <h4 key={idx} className={styles.element}>
                {cb.date}
              </h4>
            );
          })}
        </div>
      </div>
    </div>
  );
};
