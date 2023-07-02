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

// reducer Action
type EventActionType =
  | { type: 'add'; payload: EventType }
  | { type: 'delete'; payload: string }
  | { type: 'getEventsByDate'; payload: number }
  | { type: 'reset' };

export type { EventType, DateType, EventActionType };
