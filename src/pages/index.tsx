import { Inter } from 'next/font/google';
import { useState, createContext } from 'react';
import styles from '@/styles/Home.module.css';

import { CalendarContextType } from '@/types';

import { Header } from '@/components/layouts/Header';
import { CalendarBoard } from '@/components/CalendarBoard';

export const CalendarContext = createContext<CalendarContextType>({
  year: 2023,
  month: 6,
  board: [],
});

const getCalendarBoard = (currYear: number, currMonth: number): number[] => {
  const calendarBoard: number[] = Array(35)
    .fill(0)
    .map((_, i) => {
      const firstDate = new Date(currYear, currMonth, 1);
      const firstDay = firstDate.getDay();
      const curDay = i - firstDay;

      firstDate.setDate(firstDate.getDate() + curDay);
      const calendarDate = firstDate.getDate();
      return calendarDate;
    });

  return calendarBoard;
};

export default function Home() {
  const today = new Date();
  const [currYear, currMonth, currDate] = [today.getFullYear(), today.getMonth(), today.getDate()];

  const calendarBoard: number[] = getCalendarBoard(currYear, currMonth);

  return (
    <div className={styles.container}>
      <CalendarContext.Provider
        value={{
          year: currYear,
          month: currMonth,
          board: calendarBoard,
        }}
      >
        <div className={styles.container_header}>
          <Header />
        </div>
        <div className={styles.container_board}>
          <CalendarBoard />
        </div>
      </CalendarContext.Provider>
    </div>
  );
}
