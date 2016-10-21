import React from 'react';

export default props =>
  <div id="profile-card">
    <img
      src="./client/assets/Person-Landing.png"
      alt="Person"
    />
    <h3>{props.firstName} {props.lastName}</h3>
    <p>{props.username}</p>
    <button id="edit-info">Edit Info</button>
  </div>;
