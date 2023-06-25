import React from 'react';
import styles from './Navigation.module.css';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';

import { NavigationArrow } from '@/components/elements/NavigationArrow';

export const Navigation = () => {
  return (
    <div className={styles.navigation}>
      <div className={styles.calendar_arrow}>
        <NavigationArrow size='large' />
      </div>
      <div className={styles.display_date}>
        <h1>2023 年 6 月 1 日</h1>
      </div>
      <div className={styles.tips_icons}>
        <SearchIcon />
        <HelpOutlineIcon />
        <SettingsIcon />
      </div>
      <div className={styles.display_type}>
        <div className={styles.display_type_box}>
          <KeyboardArrowDownIcon />
          <p>月</p>
        </div>
      </div>
    </div>
  );
};
