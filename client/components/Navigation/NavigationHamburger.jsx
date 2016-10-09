import React from 'react';

export default props =>
  <button id="hamburger-button" onClick={props.onClick}>
    <img
      id="hamburger-div"
      src="./client/assets/menu-icon.png"
      alt="menu"
      width="40"
      height="40"
    />
  </button>;


// style={{ 'background-image': url('/client/assets/hamburger.png') }}