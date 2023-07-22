import React, { useContext } from 'react';
import styles from './CalendarSidevar.module.css';

import { CalendarContext } from '@/pages/index';

import { NavigationArrow } from '@/components/elements/NavigationArrow';
import { OverviewCalendar } from '@/components/elements/OverviewCalendar';

export const CalendarSidevar = () => {
  const { selectedOverviewDate, calendarOverview, handleSelectedBoardDate, checkIsToday, handleSelectedOverviewMonth } =
    useContext(CalendarContext);

  return (
    <div className={styles.sidenav}>
      <div className={styles.overview}>
        <div className={styles.overview_calendar}>
          <div className={styles.overview_navigation}>
            <p className={styles.navigation_date}>
              {selectedOverviewDate.year} 年 {selectedOverviewDate.month + 1} 月
            </p>
            <div className={styles.overview_arrow}>
              <NavigationArrow handleSelectedDate={handleSelectedOverviewMonth} size='tiny' />
            </div>
          </div>
          <OverviewCalendar
            calendarOverview={calendarOverview}
            handleSelectedBoardDate={handleSelectedBoardDate}
            checkIsToday={checkIsToday}
          />
        </div>
      </div>
      <div className={styles.options}>
        <p>options</p>
        <input type='checkbox' /> 五十嵐 蓮
      </div>
    </div>
  );
};
