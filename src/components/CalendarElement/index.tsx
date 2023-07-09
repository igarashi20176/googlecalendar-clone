import React from 'react';
import styles from './CalendarElement.module.css';

import { DateType, EventType } from '@/types/index';
import { handleClientScriptLoad } from 'next/script';

type Props = {
  fullDate: DateType;
  isToday: boolean;
  events: EventType[];
  handleDialog: VoidFunction;
};

export const CalendarElement: React.FC<Props> = (props) => {
  const { year, month, date } = props.fullDate;
  const todayEmphasis = props.isToday ? styles.today : '';

  return (
    <div className={styles.element} onClick={props.handleDialog}>
      <p className={[styles.element_date, todayEmphasis].join(' ')}>
        {date === 1 ? `${month + 1}月${date}日` : `${date}`}
      </p>

      {props.events.length >= 1 && (
        <div className={styles.element_event}>
          <p className={styles.element_title}>{props.events[0].title}</p>
          {props.events.length >= 2 && <p>他 {props.events.length - 1}件 +</p>}
        </div>
      )}
    </div>
  );
};
