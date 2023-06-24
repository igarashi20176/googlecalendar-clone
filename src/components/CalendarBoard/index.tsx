import React from 'react';
import styles from './CalendarBoard.module.css';

import { CalendarBoardOverview } from '../CalendarBoardOverview';
import { CalendarElement } from '../CalendarElement';

export const CalendarBoard = () => {
  const days: Array<string> = ['日', '月', '火', '水', '木', '金', '土'];

  return (
    <div className={styles.board}>
      <div className={styles.board_overview}>
        <CalendarBoardOverview />
      </div>
      <div className={styles.board_element}>
        <div className={styles.week}>
          {days.map((day) => {
            return <h4 className={styles.days}>{day}</h4>;
          })}
        </div>
        <div className={styles.element_grid}>
          {new Array(35).fill(0).map((i) => {
            return <CalendarElement key={i} />;
          })}
        </div>
      </div>
    </div>
  );
};
