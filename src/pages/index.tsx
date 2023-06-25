import { Inter } from 'next/font/google';
import { useState } from 'react';
import styles from '@/styles/Home.module.css';

import { Header } from '@/components/layouts/Header';
import { CalendarBoard } from '@/components/CalendarBoard';

export default function Home() {
  const [now_date, set_now_date] = useState(new Date());

  return (
    <div className={styles.container}>
      <div className={styles.container_header}>
        <Header />
      </div>
      <div className={styles.container_board}>
        <CalendarBoard />
      </div>
    </div>
  );
}
