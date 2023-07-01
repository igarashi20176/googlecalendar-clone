type EventType = {
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  participants: Array<string>;
  notificationSettings: {
    time: string;
    method: string;
  };
};

type DateType = {
  month: number | null;
  date: number;
};

// context
type CalendarContextType = {
  year: number;
  month: number;
  board: DateType[];
};

// reducer Action
type EventActionType =
  | { type: 'add'; payload: EventType }
  | { type: 'delete'; payload: string }
  | { type: 'getEventsByDate'; payload: number }
  | { type: 'reset' };

export type { EventType, CalendarContextType, DateType, EventActionType };
