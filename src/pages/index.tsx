import { Inter } from 'next/font/google';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import styles from '@/styles/Home.module.css';

import { DateType, ViewType, CalendarContextType } from '@/types';

import { Header } from '@/components/layouts/Header';
import { CalendarBoard } from '@/components/CalendarBoard';

export const CalendarContext = createContext<CalendarContextType>({
  calendarBoard: [],
  calendarOverview: [],
  selectedBoardDate: { year: 0, month: 0, date: 0 },
  selectedOverviewDate: { year: 0, month: 0, date: 0 },
  checkIsToday: () => true,
  handleSelectedBoardMonth: () => {},
  handleSelectedOverviewMonth: () => {},
  handleSelectedBoardDate: () => {},
});

const getCalendarBoard = (selectedYear: number, selectedBoardDate: number): number[] => {
  return Array(35)
    .fill(0)
    .map((_, i) => {
      const firstDate = new Date(selectedYear, selectedBoardDate, 1);
      const firstDayIndex = firstDate.getDay();
      const diffFromFirstDate = i - firstDayIndex;

      firstDate.setDate(firstDate.getDate() + diffFromFirstDate);
      const dateElement = firstDate.getDate();
      return dateElement;
    });
};

const Home: React.FC = () => {
  const today = new Date();
  const todayDate: DateType = {
    year: today.getFullYear(),
    month: today.getMonth(),
    date: today.getDate(),
  };

  const [viewType, setViewType] = useState<ViewType>('month');
  const [selectedBoardDate, setSelectedBoardDate] = useState<DateType>(todayDate);
  const [selectedOverviewDate, setSelectedOverviewDate] = useState<DateType>(todayDate);

  // カレンダーが変更されたらオーバービューカレンダーに同期
  useEffect(() => {
    setSelectedOverviewDate(selectedBoardDate);
  }, [selectedBoardDate]);

  // [エラー]2022/12 -> 2023/1にような年代わりの場合に，selectedYearの整合性が取れない
  const calendarWithFullDate = useCallback((selectedDate: DateType) => {
    const { year: sYear, month: sMonth, date: sDate } = selectedDate;
    const cb = getCalendarBoard(sYear, sMonth);

    let count = 0;
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
  }, []);

  const checkIsToday = (d: DateType): boolean => {
    return (Object.keys(d) as (keyof DateType)[]).every((prop) => todayDate[prop] === d[prop]);
  };

  const handleSelectedMonth = useCallback(
    (step: number, setSelectedDate: React.Dispatch<React.SetStateAction<DateType>>): void => {
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
    },
    [],
  );

  // [バグ] reflect関数を実行してもoverviewとboardが同期しない
  const handleSelectedBoardMonth = useCallback((step: number): void => {
    handleSelectedMonth(step, setSelectedBoardDate);
  }, []);

  const handleSelectedOverviewMonth = useCallback(
    (step: number): void => handleSelectedMonth(step, setSelectedOverviewDate),
    [],
  );

  const handleSelectedBoardDate = useCallback((fullDate: DateType): void => {
    setSelectedBoardDate(fullDate);
  }, []);

  return (
    <div className={styles.container}>
      <CalendarContext.Provider
        value={{
          calendarBoard: calendarWithFullDate(selectedBoardDate),
          calendarOverview: calendarWithFullDate(selectedOverviewDate),
          selectedBoardDate: selectedBoardDate,
          selectedOverviewDate: selectedOverviewDate,
          checkIsToday: checkIsToday,
          handleSelectedBoardMonth: handleSelectedBoardMonth,
          handleSelectedOverviewMonth: handleSelectedOverviewMonth,
          handleSelectedBoardDate: handleSelectedBoardDate,
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

export default Home;
