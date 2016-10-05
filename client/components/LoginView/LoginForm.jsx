import React from 'react';

export default props =>
  <div className="LoginForm" style={{ display: props.display }}>
    <input type="text" placeholder="username" />
    <input type="text" placeholder="password" />
    <button onClick={props.onSubmit}>Log in!</button>
  </div>;
