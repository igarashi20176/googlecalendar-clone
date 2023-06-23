import React from 'react';
import NextImage from 'next/image';
import styles from './Header.module.css';
import logoImage from '@/images/google_logo.png';

import { Navigation } from '../Navigation/index';
import ReorderIcon from '@mui/icons-material/Reorder';

export const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header_logo}>
        <ReorderIcon />
        <NextImage className={styles.logo_image} src={logoImage} alt='google' />
      </div>
      <div className={styles.navigation}>
        <Navigation />
      </div>
    </div>
  );
};
