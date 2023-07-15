import React from 'react';
import styles from './CalendarMonthlyBoard.module.css';

import { CalendarElement } from '@/components/CalendarElement';

type Props = {
  calendarBoard: any;
  checkIsToday: any;
  getEventsByDate: any;
  handleEventStartDate: any;
  openDialog: VoidFunction;
};

const days: Array<string> = ['日', '月', '火', '水', '木', '金', '土'];

export const CalendarMonthlyBoard: React.FC<Props> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.week}>
        {days.map((day) => {
          return (
            <p key={day} className={styles.days}>
              {day}
            </p>
          );
        })}
      </div>
      <div className={styles.grid_container}>
        {props.calendarBoard.map((cb: any, idx: number) => {
          return (
            <CalendarElement
              key={idx}
              fullDate={cb}
              isToday={props.checkIsToday(cb)}
              events={props.getEventsByDate(cb)}
              handleDialog={() => {
                props.handleEventStartDate(cb);
                props.openDialog();
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
