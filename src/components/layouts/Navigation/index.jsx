import React, { useContext } from 'react';
import styles from './Navigation.module.css';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';

import { NavigationArrow } from '@/components/elements/NavigationArrow';
import { CalendarContext } from '@/pages';

export const Navigation = () => {
  const { handleSelectedMonth, selectedDate } = useContext(CalendarContext);

  return (
    <div className={styles.navigation}>
      <div className={styles.calendar_arrow}>
        <NavigationArrow size='medium' handleSelectedMonth={handleSelectedMonth} />
      </div>
      <div className={styles.view_date}>
        <h2>
          {selectedDate.year} 年 {selectedDate.month + 1} 月
        </h2>
      </div>
      <div className={styles.tips_icons}>
        <SearchIcon className={styles.search_icon} />
        <HelpOutlineIcon />
        <SettingsIcon />
      </div>
      <div className={styles.view_type}>
        <div className={styles.view_type_box}>
          <KeyboardArrowDownIcon />
          <p>月</p>
        </div>
      </div>
    </div>
  );
};
