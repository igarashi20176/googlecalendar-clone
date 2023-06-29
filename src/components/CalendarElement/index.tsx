import React from 'react';
import styles from './CalendarElement.module.css';

export const CalendarElement: React.FC<{ month: number | null; date: number }> = (props) => {
  return (
    <div className={styles.element}>
      <h4 className={styles.element_title}>
        {props.month === null ? `${props.date}` : `${props.month}月${props.date}日`}
      </h4>
      <ul>
        <li>イベント1</li>
        <li>イベント2</li>
      </ul>
    </div>
  );
};
