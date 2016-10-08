import React from 'react';

export default props =>
  <button id="hamburger" onClick={props.onClick}>
    <img src="./client/assets/hamburger.png" alt="menu" width="40" height="40" />
  </button>;
