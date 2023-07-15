import React, { useState, useReducer, useContext, useCallback, ChangeEvent } from 'react';
import styles from './CalendarBoard.module.css';

import { CalendarContext } from '@/pages/index';

import { EventType, DateType, EventActionType } from '@/types';

import { useDialog } from '@/features/hooks/useDialog';

import { OverviewCalendar } from '@/components/elements/OverviewCalendar';
import { CalendarBoardOverview } from '../CalendarBoardOverview';
import { CalendarMonthlyBoard } from '@/components/CalendarMonthlyBoard';

const days: Array<string> = ['日', '月', '火', '水', '木', '金', '土'];

type State = EventType[];

const initialState: State = [
  {
    title: 'ミーティング',
    startDate: '2023年6月5日',
    endDate: '2023年6月5日',
    location: '会議室A',
  },
  {
    title: 'ティーチング',
    startDate: '2023年6月5日',
    endDate: '2023年6月5日',
    location: '会議室B',
  },
  {
    title: 'ランチ',
    startDate: '2023年6月28日',
    endDate: '2023年6月28日',
    location: '渋谷遊覧堂',
  },
  {
    title: 'A君と会社帰りに飲みに行く',
    startDate: '2023年6月15日',
    endDate: '2023年6月15日',
    location: '呑み天国',
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
  const { Dialog, open: openDialog, close: closeDialog } = useDialog();
  const [inputEvent, setInputEvent] = useState<EventType>({
    title: '',
    startDate: '',
    endDate: '',
    location: '',
  });

  const { calendarBoard, checkIsToday, viewType } = useContext(CalendarContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputEvent = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { name: key, value } = e.target;
    setInputEvent((prevInputEvent) => ({
      ...prevInputEvent,
      [key]: value,
    }));
  }, []);

  const handleEventStartDate = useCallback((fullDate: DateType): void => {
    const { year, month, date } = fullDate;

    setInputEvent((prevInputEvent) => ({
      ...prevInputEvent,
      // ユーザに表示するため+1
      startDate: `${year}年${month + 1}月${date}日`,
    }));
  }, []);

  const resetInputEvent = () => {
    setInputEvent({
      title: '',
      startDate: '',
      endDate: '',
      location: '',
    });
  };

  const getEventsByDate = useCallback(
    (fullDate: DateType): EventType[] => {
      const { month: currMonth, date: currDate } = fullDate;

      return state.filter((e) => {
        const [_, month, date] = Array.from(e.startDate.matchAll(/\d+/g), (match) => Number(match[0]));
        return currMonth === month && currDate === date;
      });
    },
    [state],
  );

  return (
    <div className={styles.board}>
      <section className={styles.board_overview}>
        <CalendarBoardOverview />
      </section>

      <section className={styles.board_elements}>
        <CalendarMonthlyBoard
          calendarBoard={calendarBoard}
          checkIsToday={checkIsToday}
          getEventsByDate={getEventsByDate}
          handleEventStartDate={handleEventStartDate}
          openDialog={openDialog}
        />
      </section>

      <Dialog>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({ type: 'add', payload: inputEvent });
            closeDialog();
            resetInputEvent();
          }}
        >
          <div>
            <label>
              タイトル:
              <input onChange={handleInputEvent} type='text' value={inputEvent.title} name='title' />
            </label>
          </div>
          <div>
            <label>
              開始日:
              <input onChange={handleInputEvent} type='text' value={inputEvent.startDate} name='startDate' />
            </label>
          </div>
          <div>
            <label>
              終了日:
              <input onChange={handleInputEvent} type='text' value={inputEvent.endDate} name='endDate' />
            </label>
          </div>
          <div>
            <label>
              場所:
              <input onChange={handleInputEvent} type='text' value={inputEvent.location} name='location' />
            </label>
          </div>
          <button type='submit'>イベントを追加</button>
        </form>

        <footer>
          <button type='button' onClick={closeDialog}>
            close
          </button>
        </footer>
      </Dialog>
    </div>
  );
};
