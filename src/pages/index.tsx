import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';

import { Header } from '@/components/layouts/Header';
import { CalendarBoard } from '@/components/CalendarBoard';

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <CalendarBoard />
    </div>
  );
}
