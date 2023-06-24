import React from 'react';
import styles from './CalendarElement.module.css';

export const CalendarElement = () => {
  return (
    <div className={styles.element}>
      <h3 className={styles.element_title}>Event</h3>
      <ul>
        <li>イベント1</li>
        <li>イベント2</li>
      </ul>
    </div>
  );
};
