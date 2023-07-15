import React, { useContext } from 'react';
import styles from './Navigation.module.css';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';

import { PulldownSelect } from '@/components/elements/PulldownSelect';
import { NavigationArrow } from '@/components/elements/NavigationArrow';
import { CalendarContext } from '@/pages';

export const Navigation = () => {
  const { handleSelectedBoardMonth, selectedBoardDate, viewType, handleViewType } = useContext(CalendarContext);

  return (
    <div className={styles.navigation}>
      <div className={styles.calendar_arrow}>
        <NavigationArrow size='medium' handleSelectedMonth={handleSelectedBoardMonth} />
      </div>
      <div className={styles.view_date}>
        <h2>
          {selectedBoardDate.year} 年 {selectedBoardDate.month + 1} 月
        </h2>
      </div>
      <div className={styles.tips_icons}>
        <SearchIcon className={styles.search_icon} />
        <HelpOutlineIcon />
        <SettingsIcon />
      </div>
      <div className={styles.view_type}>
        <PulldownSelect viewType={viewType} handleViewType={handleViewType} />
      </div>
    </div>
  );
};
