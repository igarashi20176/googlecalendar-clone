import { Inter } from 'next/font/google';
import { createContext, useCallback, useEffect, useState, ChangeEvent } from 'react';
import styles from '@/styles/Home.module.css';

import { DateType, ViewType, CalendarContextType } from '@/types';

import { Header } from '@/components/layouts/Header';
import { CalendarBoard } from '@/components/CalendarBoard';

export const CalendarContext = createContext<CalendarContextType>({
  calendarBoard: [],
  calendarOverview: [],
  selectedBoardDate: { year: 0, month: 0, date: 0 },
  selectedOverviewDate: { year: 0, month: 0, date: 0 },
  viewType: 'month',
  checkIsToday: () => true,
  handleSelectedBoardMonth: () => {},
  handleSelectedOverviewMonth: () => {},
  handleSelectedBoardDate: () => {},
  handleViewType: () => {},
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

  // calndarBoardが変更されたらOverviewCalendarに同期
  useEffect(() => {
    setSelectedOverviewDate(selectedBoardDate);
  }, [selectedBoardDate]);

  // [エラー]2022/12 -> 2023/1にような年代わりの場合に，selectedYearの整合性が取れない
  const getMonthlyCalendar = useCallback((selectedyear: number, selectedMonth: number) => {
    const cb = getCalendarBoard(selectedyear, selectedMonth);

    let count = 0;
    return cb.map((date) => {
      if (date === 1) count++;
      // 日付が1の場合，月を表示 / 二回目の1の時，次月を表示
      switch (count) {
        case 0:
          return { year: selectedyear, month: selectedMonth - 1, date };
        case 1:
          return { year: selectedyear, month: selectedMonth, date };
        case 2:
          return { year: selectedyear, month: selectedMonth + 1, date };
        default:
          return { year: 2023, month: 0, date: 1 };
      }
    });
  }, []);

  const getYearlyCalendar = useCallback((year: number) => {
    return Array(12)
      .fill(0)
      .map((_, i) => getMonthlyCalendar(year, i));
  }, []);

  const checkIsToday = (d: DateType): boolean => {
    return (Object.keys(d) as (keyof DateType)[]).every((prop) => todayDate[prop] === d[prop]);
  };

  const handleViewType = useCallback((event: ChangeEvent<HTMLSelectElement>): void => {
    const type = event.target.value;

    if (type === 'year' || type === 'month' || type === 'week' || type === 'day') {
      setViewType(type);
    }
  }, []);

  const changeSelectedMonth = useCallback(
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
    changeSelectedMonth(step, setSelectedBoardDate);
  }, []);

  const handleSelectedOverviewMonth = useCallback(
    (step: number): void => changeSelectedMonth(step, setSelectedOverviewDate),
    [],
  );

  const handleSelectedBoardDate = useCallback((fullDate: DateType): void => {
    setSelectedBoardDate(fullDate);
  }, []);

  let calendarBoard: any = [];
  if (viewType == 'year') {
    calendarBoard = getYearlyCalendar(selectedBoardDate.year);
    console.log(calendarBoard);
  } else if (viewType == 'month') {
    calendarBoard = getMonthlyCalendar(selectedBoardDate.year, selectedBoardDate.month);
  }

  return (
    <div className={styles.container}>
      <CalendarContext.Provider
        value={{
          calendarBoard: calendarBoard,
          calendarOverview: getMonthlyCalendar(selectedOverviewDate.year, selectedOverviewDate.month),
          selectedBoardDate: selectedBoardDate,
          selectedOverviewDate: selectedOverviewDate,
          viewType: viewType,
          checkIsToday: checkIsToday,
          handleSelectedBoardMonth: handleSelectedBoardMonth,
          handleSelectedOverviewMonth: handleSelectedOverviewMonth,
          handleSelectedBoardDate: handleSelectedBoardDate,
          handleViewType: handleViewType,
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
