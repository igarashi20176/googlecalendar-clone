import React from 'react';
import styles from './CalendarBoard.module.css';

import { CalendarBoardOverview } from '../CalendarBoardOverview';
import { CalendarElement } from '../CalendarElement';

export const CalendarBoard = () => {
  return (
    <div className={styles.board}>
      <div className={styles.board_overview}>
        <CalendarBoardOverview />
      </div>
      <div className={styles.board_element}>
        <p>calendar_board_right</p>
      </div>
    </div>
  );
};
