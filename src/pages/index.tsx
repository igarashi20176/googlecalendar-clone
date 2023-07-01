import { Inter } from 'next/font/google';
import { useState, createContext, useCallback } from 'react';
import styles from '@/styles/Home.module.css';

import { CalendarContextType, DateType } from '@/types';

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

  let count = 0;
  const getCalendarBoardAddingMonth = useCallback(
    (currYear: number, currMonth: number): DateType[] => {
      const cb = getCalendarBoard(currYear, currMonth);

      return cb.map((date) => {
        // カレンダーの日付が1じゃない場合，nullを返しカレンダーに月を表示しない
        if (date !== 1) {
          return { month: null, date: date };
        }

        count += 1;
        // 日付が1の場合，月を表示 / 二回目の1の時，次月を表示
        if (count === 2) {
          return { month: currMonth + 1, date: date };
        } else {
          return { month: currMonth, date: date };
        }
      });
    },
    [today],
  );

  const calendarBoardAddingMonth: DateType[] = getCalendarBoardAddingMonth(currYear, currMonth);

  return (
    <div className={styles.container}>
      <CalendarContext.Provider
        value={{
          year: currYear,
          month: currMonth,
          board: calendarBoardAddingMonth,
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
