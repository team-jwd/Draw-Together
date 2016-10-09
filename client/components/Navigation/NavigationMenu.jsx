import React from 'react';

export default props =>
  <div id="navigation-menu" style={{ display: props.display }}>
    <button onClick={props.onClick} value="profile">Profile</button>
    <button onClick={props.onClick} value="logout">Logout</button>
  </div>;

