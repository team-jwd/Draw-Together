import React from 'react';

export default props =>
  <div className="SignupForm" style={{ display: props.display }}>
    <input type="text" placeholder="First name" />
    <input type="text" placeholder="Last name" />
    <input type="text" placeholder="username" />
    <input type="text" placeholder="password" />
    <button onClick={props.onSubmit}>Sign up!</button>
  </div>;
