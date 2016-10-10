import React from 'react';

export default props =>
  <div
    id={`${props.type.toLowerCase()}-form`}
    style={{ display: props.display }}
  >
    <input
      type="text"
      name={`${props.type.toLowerCase()}RoomName`}
      placeholder="Room Name"
      onChange={props.handleRoomNameChange}
    />
    <input
      type="password"
      name={`${props.type.toLowerCase()}RoomPassword`}
      placeholder="Password"
      onChange={props.handlePasswordChange}
    />
    <button
      onClick={props.onSubmit}
    >
      {`${props.type}!`}
    </button>
  </div>;
