import React from 'react';

export default props =>
  <div>
    <button
      type="text"
      onClick={props.onClick}
      value="create"
    >
      Create Room
    </button>
  </div>;
