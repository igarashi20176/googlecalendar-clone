import React, { useCallback, useContext } from 'react';
import styles from './CalendarMonthlyBoard.module.css';

import { CalendarElement } from '@/components/CalendarElement';
import { DateType, EventType, CalendarBoardType } from '@/types';

import { CalendarContext } from '@/pages/index';

type Props = {
  getEventsByDate: (fullDate: DateType) => EventType[];
  handleEventStartDate: (fullDate: DateType) => void;
  openDialog: VoidFunction;
};

const days: Array<string> = ['日', '月', '火', '水', '木', '金', '土'];

export const CalendarMonthlyBoard: React.FC<Props> = (props) => {
  const { calendarBoard, checkIsToday } = useContext(CalendarContext);

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
        {calendarBoard.map((cb: any, idx: number) => {
          return (
            <CalendarElement
              key={idx}
              fullDate={cb}
              isToday={checkIsToday(cb)}
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
