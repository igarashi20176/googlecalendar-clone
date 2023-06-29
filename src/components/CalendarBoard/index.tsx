import React, { useState, useReducer, useContext } from 'react';
import styles from './CalendarBoard.module.css';

import { CalendarContext } from '@/pages/index';

import { EventType, CalendarContextType } from '@/types';

import { CalendarBoardOverview } from '../CalendarBoardOverview';
import { CalendarElement } from '../CalendarElement';
import { log } from 'console';

type State = EventType[];

const initialState: State = [
  {
    title: 'ミーティング',
    startDate: '2023-06-29T10:00:00',
    endDate: '2023-06-29T12:00:00',
    location: '会議室A',
    participants: ['john@example.com', 'jane@example.com'],
    notificationSettings: {
      time: '10 minutes before',
      method: 'email',
    },
  },
];

type Action = { type: 'add'; payload: EventType } | { type: 'delete'; payload: string } | { type: 'reset' };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'add':
      return [...state, action.payload];
    case 'delete':
      const filteredEvents = state.filter((event) => event.title !== action.payload);
      return filteredEvents;
    case 'reset':
      return initialState;
    default:
      return state;
  }
};

export const CalendarBoard: React.FC = () => {
  let count = 0;
  const days: Array<string> = ['日', '月', '火', '水', '木', '金', '土'];
  const [state, dispatch] = useReducer(reducer, initialState);

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
          {calendar.board.map((date, idx) => {
            // カレンダーの日付が1の場合，月を表示
            if (date !== 1) {
              return <CalendarElement key={idx} month={null} date={date} />;
            }

            count += 1;
            // 日付が二回目の1の時，次月を表示
            if (count === 2) {
              return <CalendarElement key={idx} month={calendar.month + 1} date={date} />;
            } else {
              return <CalendarElement key={idx} month={calendar.month} date={date} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};
