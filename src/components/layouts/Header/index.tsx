import React from 'react';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headerLogo}>
        <p>logo</p>
      </div>
      <div className={styles.navigation}>
        <p>navigation</p>
      </div>
    </div>
  );
};
