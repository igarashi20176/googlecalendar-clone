import { useCallback, useState } from 'react';

import { DateType } from '@/types';

type Return = {
  open: VoidFunction;
  close: VoidFunction;
};

export const useSelectedDate = (initialDate: DateType) => {
  const [selectedDate, setSelectedDate] = useState<DateType>(initialDate);

  // selectedBoardとselectedOverviewの月操作を共通化
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

  const changeSelectedYear = useCallback((step: number): void => {
    setSelectedDate((prevSelectedDate) => ({ ...prevSelectedDate, year: prevSelectedDate.year + step }));
  }, []);

  // [バグ] reflect関数を実行してもoverviewとboardが同期しない
  const handleSelectedMonth = useCallback((step: number): void => {
    changeSelectedMonth(step, setSelectedDate);
  }, []);

  // const handleSelectedOverviewMonth = useCallback(
  //   (step: number): void => changeSelectedMonth(step, setSelectedOverviewDate),
  //   [],
  // );

  const handleSelectedDate = useCallback((fullDate: DateType): void => {
    setSelectedDate(fullDate);
  }, []);

  return { selectedDate, setSelectedDate, handleSelectedDate };
};
