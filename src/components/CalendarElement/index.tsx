import React from 'react';
import styles from './CalendarElement.module.css';

import { EventType } from '@/types/index';

export const CalendarElement: React.FC<{ month: number | null; date: number; events: EventType[] }> = (props) => {
  return (
    <div className={styles.element}>
      <h4 className={styles.element_title}>
        {props.month === null ? `${props.date}` : `${props.month}月${props.date}日`}
      </h4>
      <ul>
        {props.events.map((e, idx) => {
          return <li key={idx}>{e.title}</li>;
        })}
      </ul>
    </div>
  );
};
