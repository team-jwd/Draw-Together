import React from 'react';

export default props =>
  <div>
    <button
      type="text"
      onClick={props.onClick}
      value={props.type.toLowerCase()}
    >
      {`${props.type}`} a Room
    </button>
  </div>;
