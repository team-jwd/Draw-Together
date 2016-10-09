import {
  INITIAL_STATE, login, logout,
  joinRoom, leaveRoom, addMessage,
  userJoin, userLeave,
} from './state-transformations';

export default function reducer(state = INITIAL_STATE, action) {
  /* eslint no-case-declarations: 0 */
  switch (action.type) {
    case 'LOGIN':
      const { username, firstName, lastName } = action;
      return login(state, username, firstName, lastName);

    case 'LOGOUT':
      return logout(state);

    case 'JOIN_ROOM':
      const { name } = action;
      return joinRoom(state, name);

    case 'LEAVE_ROOM':
      return leaveRoom(state);

    case 'ADD_MESSAGE':
      const { username: username_, text } = action;
      return state.update('room',
        roomState => addMessage(roomState, username_, text)
      );

    case 'USER_JOIN':
      const { username: username__ } = action;
      return state.update('room',
        roomState => userJoin(roomState, username__)
      );

    case 'USER_LEAVE':
      const { username: username___ } = action;
      return state.update('room',
        roomState => userLeave(roomState, username___)
      );

    default:
      return state;
  }
}
