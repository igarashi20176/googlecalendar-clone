import React from 'react';
import styles from './Navigation.module.css';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';

export const Navigation = () => {
  return (
    <div className={styles.navigation}>
      <div className={styles.calendar_arrow}>
        <div className={styles.arrow}>
          <ArrowBackIosIcon />
          <ArrowForwardIosIcon />
        </div>
      </div>
      <h2 className={styles.display_date}>2023年6月1日</h2>
      <div className={styles.tips_icons}>
        <SearchIcon />
        <HelpOutlineIcon />
        <SettingsIcon />
      </div>
      <div className={styles.display_type}>
        <KeyboardArrowDownIcon />
        <p>月</p>
      </div>
    </div>
  );
};
