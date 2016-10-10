import React from 'react';

export default props =>
  <div>
    <button
      type="text"
      onClick={props.onClick}
      value="join"
    >
      Join a room
    </button>
  </div>;
