import { Inter } from 'next/font/google';
import { createContext, useCallback, useMemo, useState } from 'react';
import styles from '@/styles/Home.module.css';

import { DateType, ViewType, CalendarContextType } from '@/types';

import { Header } from '@/components/layouts/Header';
import { CalendarBoard } from '@/components/CalendarBoard';

export const CalendarContext = createContext<CalendarContextType>({
  calendarBoard: [],
  selectedDate: { year: 0, month: 0, date: 0 },
  handleSelectedMonth: () => {},
});

const getCalendarBoard = (selectedYear: number, selectedDate: number): number[] => {
  return Array(35)
    .fill(0)
    .map((_, i) => {
      const firstDate = new Date(selectedYear, selectedDate, 1);
      const firstDayIndex = firstDate.getDay();
      const diffFromFirstDate = i - firstDayIndex;

      firstDate.setDate(firstDate.getDate() + diffFromFirstDate);
      const dateElement = firstDate.getDate();
      return dateElement;
    });
};

export const Home = () => {
  const today = new Date();
  const todayDate: DateType = {
    year: today.getFullYear(),
    month: today.getMonth(),
    date: today.getDate(),
  };

  const [viewType, setViewType] = useState<ViewType>('year');
  const [selectedDate, setSelectedDate] = useState<DateType>(todayDate);

  // [エラー]2022/12 -> 2023/1にような年代わりの場合に，selectedYearの整合性が取れない
  let count = 0;
  const calendarBoardWithFullDate = useMemo(() => {
    const { year: sYear, month: sMonth, date: sDate } = selectedDate;
    const cb = getCalendarBoard(sYear, sMonth);

    return cb.map((date) => {
      if (date === 1) count++;
      // 日付が1の場合，月を表示 / 二回目の1の時，次月を表示
      switch (count) {
        case 0:
          return { year: sYear, month: sMonth - 1, date };
        case 1:
          return { year: sYear, month: sMonth, date };
        case 2:
          return { year: sYear, month: sMonth + 1, date };
        default:
          return { year: 2023, month: 0, date: 1 };
      }
    });
  }, [selectedDate]);

  const handleSelectedMonth = useCallback((step: number): void => {
    setSelectedDate((prevSelectedDate) => {
      // [注意] システム上では，monthの値は，0-index
      if (prevSelectedDate.month + step === -1) {
        return { ...prevSelectedDate, year: prevSelectedDate.year - 1, month: 11 };
      }
      if (prevSelectedDate.month + step === 12) {
        return { ...prevSelectedDate, year: prevSelectedDate.year + 1, month: 0 };
      }

      return { ...prevSelectedDate, month: prevSelectedDate.month + step };
    });
  }, []);

  return (
    <div className={styles.container}>
      <CalendarContext.Provider
        value={{
          calendarBoard: calendarBoardWithFullDate,
          handleSelectedMonth: handleSelectedMonth,
          selectedDate: selectedDate,
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
};
