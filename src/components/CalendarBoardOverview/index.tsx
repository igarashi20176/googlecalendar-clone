import React from 'react';
import styles from './CalendarBoardOverview.module.css';

import { NavigationArrow } from '@/components/elements/NavigationArrow';
import { OverviewCalendar } from '@/components/elements/OverviewCalendar';

export const CalendarBoardOverview = () => {
  const days: Array<string> = ['日', '月', '火', '水', '木', '金', '土'];

  return (
    <div className={styles.overview}>
      <div className={styles.overview_calendar}>
        <div className={styles.calendar_container}>
          <OverviewCalendar />
        </div>
      </div>
      <div className={styles.overview_options}>
        <p>options</p>
      </div>
    </div>
  );
};
