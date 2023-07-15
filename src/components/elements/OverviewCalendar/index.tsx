import React, { useContext } from 'react';
import styles from './OverviewCalendar.module.css';

import { DateType } from '@/types';

type Props = {
  calendarOverview: DateType[];
  handleSelectedBoardDate: (fullDate: DateType) => void;
  checkIsToday: (fullDate: DateType) => boolean;
};

export const OverviewCalendar: React.FC<Props> = (props) => {
  const days: Array<string> = ['日', '月', '火', '水', '木', '金', '土'];

  return (
    <div className={styles.overview_calendar}>
      <div className={styles.overview_calendar_elements}>
        <div className={styles.week}>
          {days.map((day) => {
            return <h4 key={day}>{day}</h4>;
          })}
        </div>
        <div className={styles.elements}>
          {props.calendarOverview.map((cb, idx) => {
            return (
              <h4
                key={idx}
                onClick={() => props.handleSelectedBoardDate(cb)}
                className={[styles.element, props.checkIsToday(cb) ? styles.today : ''].join(' ')}
              >
                {cb.date}
              </h4>
            );
          })}
        </div>
      </div>
    </div>
  );
};
