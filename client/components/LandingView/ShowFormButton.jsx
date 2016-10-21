import React from 'react';

export default props =>
  <div className={props.type}>
    <button
      type="text"
      className={props.type === 'Create' ? 'signup-btn' : 'login-btn'}
      onClick={props.onClick}
      value={props.type.toLowerCase()}
    >
      {`${props.type}`} a Room
    </button>
  </div>;
