import { ChangeEvent } from 'react';

type EventType = {
  title: string;
  startDate: string;
  endDate: string;
  location: string;
};

type DateType = {
  year: number;
  month: number;
  date: number;
};

type CalendarBoardType = DateType[] | DateType[][];

type ViewType = 'year' | 'month' | 'week' | 'day';

// reducer Action
type EventActionType =
  | { type: 'add'; payload: EventType }
  | { type: 'delete'; payload: string }
  | { type: 'getEventsByDate'; payload: number }
  | { type: 'reset' };

// context Type
type CalendarContextType = {
  calendarBoard: CalendarBoardType;
  calendarOverview: DateType[];
  selectedBoardDate: DateType;
  selectedOverviewDate: DateType;
  viewType: ViewType;
  checkIsToday: (fullDate: DateType) => boolean;
  handleSelectedBoardMonth: (step: number) => void;
  handleSelectedOverviewMonth: (step: number) => void;
  handleSelectedBoardDate: (fullDate: DateType) => void;
  handleViewType: (event: ChangeEvent<HTMLSelectElement>) => void;
  changeSelectedBoardYear: (step: number) => void;
};

export type { EventType, DateType, CalendarBoardType, ViewType, EventActionType, CalendarContextType };
