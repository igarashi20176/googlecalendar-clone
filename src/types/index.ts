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

type ViewType = 'year' | 'month' | 'week' | 'day';

// reducer Action
type EventActionType =
  | { type: 'add'; payload: EventType }
  | { type: 'delete'; payload: string }
  | { type: 'getEventsByDate'; payload: number }
  | { type: 'reset' };

// context Type
type CalendarContextType = {
  calendarBoard: DateType[];
  today: DateType;
  selectedDate: DateType;
  handleSelectedMonth: (step: number) => void;
};
export type { EventType, DateType, ViewType, EventActionType, CalendarContextType };
