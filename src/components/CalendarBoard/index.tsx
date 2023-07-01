import React, { useState, useReducer, useContext } from 'react';
import styles from './CalendarBoard.module.css';

import { CalendarContext } from '@/pages/index';

import { EventType, CalendarContextType, EventActionType } from '@/types';

import { CalendarBoardOverview } from '../CalendarBoardOverview';
import { CalendarElement } from '../CalendarElement';

type State = EventType[];

const initialState: State = [
  {
    title: 'ミーティング',
    startDate: '2023-06-05T10:00:00',
    endDate: '2023-06-05T12:00:00',
    location: '会議室A',
    participants: ['john@example.com', 'jane@example.com'],
    notificationSettings: {
      time: '10 minutes before',
      method: 'email',
    },
  },
];

const reducer = (state: State, action: EventActionType) => {
  switch (action.type) {
    case 'add':
      return [...state, action.payload];
    case 'delete':
      const remainingEvents = state.filter((event) => event.title !== action.payload);
      return remainingEvents;
    case 'reset':
      return initialState;
    default:
      return state;
  }
};

export const CalendarBoard: React.FC = () => {
  const days: Array<string> = ['日', '月', '火', '水', '木', '金', '土'];
  const [state, dispatch] = useReducer(reducer, initialState);

  const getEventsByDate = (date: number) => {
    return state.filter((e) => {
      const d = new Date(e.startDate);

      return date === d.getDate();
    });
  };

  const calendar: CalendarContextType = useContext(CalendarContext);
  return (
    <div className={styles.board}>
      <div className={styles.board_overview}>
        <CalendarBoardOverview />
      </div>
      <div className={styles.board_elements}>
        <div className={styles.week}>
          {days.map((day) => {
            return (
              <h4 key={day} className={styles.days}>
                {day}
              </h4>
            );
          })}
        </div>
        <div className={styles.elements_grid}>
          {calendar.board.map((b, idx) => {
            return <CalendarElement key={idx} {...b} events={getEventsByDate(b.date)} />;
          })}
        </div>
      </div>
    </div>
  );
};
