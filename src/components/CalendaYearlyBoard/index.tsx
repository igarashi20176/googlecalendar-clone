import React, { useContext } from 'react';
import styles from './CalendarYearlyBoard.module.css';

import { CalendarBoardType, DateType, EventType } from '@/types';

import { OverviewCalendar } from '@/components/elements/OverviewCalendar';

import { CalendarContext } from '@/pages/index';

export const CalendarYearlyBoard: React.FC = () => {
  const { calendarBoard, checkIsToday } = useContext(CalendarContext);
  return (
    <div className={styles.container}>
      <div className={styles.grid_container}>
        {calendarBoard.map((cb, idx) => {
          return (
            <div className={styles.grid_item}>
              <p className={styles.overview_month}>{idx + 1} 月</p>
              <OverviewCalendar
                calendarOverview={cb as DateType[]}
                checkIsToday={checkIsToday}
                handleSelectedBoardDate={() => {}}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
