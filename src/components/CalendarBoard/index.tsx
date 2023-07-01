import React, { useState, useReducer, useContext, useCallback } from 'react';
import styles from './CalendarBoard.module.css';

import { CalendarContext } from '@/pages/index';

import { EventType, CalendarContextType, EventActionType } from '@/types';

import { useDialog } from '@/features/hooks/useDialog';

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
  {
    title: 'ティーチング',
    startDate: '2023-06-05T10:00:00',
    endDate: '2023-06-05T12:00:00',
    location: '会議室A',
    participants: ['john@example.com', 'jane@example.com'],
    notificationSettings: {
      time: '10 minutes before',
      method: 'email',
    },
  },
  {
    title: 'ランチ',
    startDate: '2023-06-05T10:00:00',
    endDate: '2023-06-05T12:00:00',
    location: '会議室A',
    participants: ['john@example.com', 'jane@example.com'],
    notificationSettings: {
      time: '10 minutes before',
      method: 'email',
    },
  },
  {
    title: 'A君と会社帰りに飲みに行く',
    startDate: '2023-06-28T10:00:00',
    endDate: '2023-06-28T12:00:00',
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
  const { Dialog, open: openDialog, close: closeDialog } = useDialog();
  const [state, dispatch] = useReducer(reducer, initialState);

  const getEventsByDate = useCallback((date: number) => {
    return state.filter((e) => {
      const d = new Date(e.startDate);

      return date === d.getDate();
    });
  }, []);

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
              <p key={day} className={styles.days}>
                {day}
              </p>
            );
          })}
        </div>
        <div className={styles.elements_grid}>
          {calendar.board.map((b, idx) => {
            return <CalendarElement key={idx} {...b} events={getEventsByDate(b.date)} />;
          })}
        </div>
      </div>

      <Dialog>
        <header>
          <h2>タイトル</h2>
        </header>
        <section>コンテンツ</section>
        <footer>
          <button type='button' onClick={closeDialog}>
            close
          </button>
        </footer>
      </Dialog>
    </div>
  );
};
