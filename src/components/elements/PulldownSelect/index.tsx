import React, { ChangeEvent } from 'react';
import styles from './PulldownSelect.module.css';

import { ViewType } from '@/types';

type Props = {
  handleViewType: (e: ChangeEvent<HTMLSelectElement>) => void;
  viewType: ViewType;
};

export const PulldownSelect = (props: Props) => {
  return (
    <label className={styles.select_container}>
      <select value={props.viewType} onChange={props.handleViewType}>
        <option value='otmo'>年</option>
        <option value='month'>月</option>
        <option value='day'>日</option>
      </select>
    </label>
  );
};
