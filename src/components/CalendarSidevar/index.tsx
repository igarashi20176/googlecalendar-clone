import React, { useContext } from 'react';
import styles from './CalendarSidevar.module.css';

import { CalendarContext } from '@/pages/index';

import { NavigationArrow } from '@/components/elements/NavigationArrow';
import { OverviewCalendar } from '@/components/elements/OverviewCalendar';

const days: Array<string> = ['日', '月', '火', '水', '木', '金', '土'];

export const CalendarSidevar = () => {
  const { selectedOverviewDate, handleSelectedOverviewMonth } = useContext(CalendarContext);

  return (
    <div className={styles.overview}>
      <div className={styles.overview_calendar}>
        <div className={styles.overview_calendar_navigation}>
          <p className={styles.navigation_date}>
            {selectedOverviewDate.year} 年 {selectedOverviewDate.month + 1} 月
          </p>
          <div className={styles.overview_arrow}>
            <NavigationArrow handleSelectedMonth={handleSelectedOverviewMonth} size='tiny' />
          </div>
        </div>
        <OverviewCalendar />
      </div>
      <div className={styles.overview_options}>
        <p>options</p>
        <input type='checkbox' /> 五十嵐 蓮
      </div>
    </div>
  );
};
