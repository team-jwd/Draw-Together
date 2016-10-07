import React from 'react';

export default props =>
  <div id="joinRoomForm">
    <p>Join Room Form</p>
    <button
      onClick={() => {
        props.onSubmit('test');
      }}
    >
    Submit!
    </button>
  </div>;
