import React, { useRef, useEffect, useCallback } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

import styles from './Dialog.module.css';

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: VoidFunction;
};

export const Dialog: React.FC<Props> = (props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect((): void => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) {
      return;
    }

    if (props.isOpen) {
      if (dialogElement.hasAttribute('open')) {
        return;
      }
      dialogElement.showModal();
    } else {
      if (!dialogElement.hasAttribute('open')) {
        return;
      }
      dialogElement.close();
    }
  }, [props.isOpen]);

  const handleClickDialog = useCallback((): void => {
    props.onClose();
  }, [props.onClose]);

  const handleClickContent = useCallback((event: React.MouseEvent<HTMLDivElement>): void => {
    // clickイベントの伝搬を止める
    // これでonCloseが誘発されない
    event.stopPropagation();
  }, []);

  return (
    <RemoveScroll removeScrollBar enabled={props.isOpen}>
      <dialog className={styles.dialog} onClick={handleClickDialog} ref={dialogRef}>
        <div className={styles.content} onClick={handleClickContent}>
          {props.children}
        </div>
      </dialog>
    </RemoveScroll>
  );
};
