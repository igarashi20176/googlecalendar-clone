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

type CalendarContextType = {
  year: number;
  month: number;
  board: number[];
};

export type { EventType, CalendarContextType };
