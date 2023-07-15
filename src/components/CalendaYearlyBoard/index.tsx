import React from 'react';
import styles from './CalendarYearlyBoard.module.css';

import { CalendarBoardType } from '@/types';

import { OverviewCalendar } from '@/components/elements/OverviewCalendar';

type Props = {
  calendarBoard: CalendarBoardType;
};

export const CalendarYearlyBoard: React.FC<Props> = (props) => {
  return (
    <div className={styles.container}>
      <div>
        <p></p>
      </div>
      <div className={styles.grid_container}>
        {props.calendarBoard.map((cb, idx) => {
          return (
            <div className={styles.grid_item}>
              <p className={styles.overview_month}>{idx + 1} 月</p>
              <OverviewCalendar />
            </div>
          );
        })}
      </div>
    </div>
  );
};
