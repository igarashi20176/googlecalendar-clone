import React from 'react';
import styles from './CalendarElement.module.css';

import { EventType } from '@/types/index';

export const CalendarElement: React.FC<{ month: number | null; date: number; events: EventType[] }> = (props) => {
  return (
    <div className={styles.element}>
      <p className={styles.element_date}>
        {props.month === null ? `${props.date}` : `${props.month}月${props.date}日`}
      </p>
      {props.events.length >= 1 && (
        <div className={styles.element_event}>
          <p className={styles.element_title}>{props.events[0].title}</p>
          <p>他 {props.events.length}件+</p>
        </div>
      )}
    </div>
  );
};
