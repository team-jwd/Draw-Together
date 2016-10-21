import React from 'react';

export default props =>
  <div
    id={`${props.type.toLowerCase()}-form`}
    style={{ display: props.display }}
  >
    <h4>{props.description}</h4>
    <label htmlFor={`${props.type.toLowerCase()}RoomName`}>
      Room Name
    </label>
    <input
      type="text"
      className={`${props.type.toLowerCase()}RoomName`}
      name={`${props.type.toLowerCase()}RoomName`}
      onChange={props.handleRoomNameChange}
    />
    <label htmlFor={`${props.type.toLowerCase()}RoomPassword`}>Password</label>
    <input
      type="password"
      className={`${props.type.toLowerCase()}RoomPassword`}
      name={`${props.type.toLowerCase()}RoomPassword`}
      onChange={props.handlePasswordChange}
    />
    <button
      onClick={props.onSubmit}
    >
      {`${props.type}!`}
    </button>
  </div>;
