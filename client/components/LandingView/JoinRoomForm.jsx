import React from 'react';

export default props =>
  <div id="joinRoomForm">

    <button
      onClick={() => {
        console.log('Clicked!');
        console.log(props.onSubmit);
        props.onSubmit('test');
      }}
    >

    Submit!
    </button>
  </div>;
