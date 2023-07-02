import React from 'react';
import styles from './CalendarElement.module.css';

import { DateType, EventType } from '@/types/index';
import { handleClientScriptLoad } from 'next/script';

export const CalendarElement: React.FC<{ fullDate: DateType; events: EventType[]; handleDialog: VoidFunction }> = (
  props,
) => {
  const { year, month, date } = props.fullDate;

  return (
    <div className={styles.element} onClick={props.handleDialog}>
      <p className={styles.element_date}>{date === 1 ? `${month + 1}月${date}日` : `${date}`}</p>

      {props.events.length >= 1 && (
        <div className={styles.element_event}>
          <p className={styles.element_title}>{props.events[0].title}</p>
          {props.events.length >= 2 && <p>他 {props.events.length - 1}件 +</p>}
        </div>
      )}
    </div>
  );
};
