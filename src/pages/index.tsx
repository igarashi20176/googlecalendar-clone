import { Inter } from 'next/font/google';
import { createContext, useCallback } from 'react';
import styles from '@/styles/Home.module.css';

import { DateType } from '@/types';

import { Header } from '@/components/layouts/Header';
import { CalendarBoard } from '@/components/CalendarBoard';

export const CalendarContext = createContext<DateType[]>([]);

const getCalendarBoard = (currYear: number, currMonth: number): number[] => {
  const calendarBoard: number[] = Array(35)
    .fill(0)
    .map((_, i) => {
      const firstDate = new Date(currYear, currMonth, 1);
      const firstDay = firstDate.getDay();
      const currDay = i - firstDay;

      firstDate.setDate(firstDate.getDate() + currDay);
      const calendarDate = firstDate.getDate();
      return calendarDate;
    });

  return calendarBoard;
};

export default function Home() {
  const today = new Date();
  const [currYear, currMonth, currDate] = [today.getFullYear(), today.getMonth(), today.getDate()];

  // 2022/12 -> 2023/1にような年代わりの場合に，currYearの整合性が取れない
  let count = 0;
  const getCalendarBoardWithFullYear = useCallback(
    (currYear: number, currMonth: number): DateType[] => {
      const cb = getCalendarBoard(currYear, currMonth);

      return cb.map((date) => {
        if (date === 1) count++;
        // 日付が1の場合，月を表示 / 二回目の1の時，次月を表示
        switch (count) {
          case 0:
            return { year: currYear, month: currMonth - 1, date };
          case 1:
            return { year: currYear, month: currMonth, date };
          case 2:
            return { year: currYear, month: currMonth + 1, date };
          default:
            return { year: 2023, month: 0, date: 1 };
        }
      });
    },
    [today],
  );

  return (
    <div className={styles.container}>
      <CalendarContext.Provider value={getCalendarBoardWithFullYear(currYear, currMonth)}>
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
