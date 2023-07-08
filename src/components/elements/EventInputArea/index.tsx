import React from 'react';

export const EventInputArea: React.FC<{
  handleInputEvent: VoidFunction;
  closeDialog: VoidFunction;
  resetInputEvent: VoidFunction;
}> = (props) => {
  return (
    <section>
      <form
        onSubmit={() => {
          // props.dispatch({ type: 'add', payload: inputEvent });
          // props.closeDialog();
          // props.resetInputEvent();
        }}
      >
        <div>
          <label>
            タイトル:
            {/* <input onChange={props.handleInputEvent} type='text' value={1} name='title' /> */}
          </label>
        </div>
        <div>
          <label>
            開始日:
            <input onChange={props.handleInputEvent} type='text' value={2} name='startDate' />
          </label>
        </div>
        <div>
          <label>
            終了日:
            <input onChange={props.handleInputEvent} type='text' value={3} name='endDate' />
          </label>
        </div>
        <div>
          <label>
            場所:
            <input onChange={props.handleInputEvent} type='text' value={4} name='location' />
          </label>
        </div>
        <button type='submit'>イベントを追加</button>
      </form>

      <footer>
        {/* <button type='button' onClick={closeDialog}>
        close
      </button> */}
      </footer>
    </section>
  );
};
