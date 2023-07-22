import React from 'react';
import styles from './CalendarYearlyBoard.module.css';

import { CalendarBoardType, DateType, EventType } from '@/types';

import { OverviewCalendar } from '@/components/elements/OverviewCalendar';

type Props = {
  calendarBoard: CalendarBoardType;
  checkIsToday: (fullDate: DateType) => boolean;
  // getEventsByDate: (fullDate: DateType) => EventType[];
};

export const CalendarYearlyBoard: React.FC<Props> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.grid_container}>
        {props.calendarBoard.map((cb, idx) => {
          return (
            <div key={idx} className={styles.grid_item}>
              <p className={styles.overview_month}>{idx + 1} 月</p>
              <OverviewCalendar
                calendarOverview={cb as DateType[]}
                checkIsToday={props.checkIsToday}
                handleSelectedBoardDate={() => {}}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
