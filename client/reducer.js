import { fromJS } from 'immutable';

import {
  INITIAL_STATE, login, logout,
  joinRoom, leaveRoom, addMessage,
  userJoin, userLeave
} from './state-transformations';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOGIN':
      const { username, firstName, lastName} = action;
      return login(state, username, firstName, lastName);
    case 'LOGOUT':
      return logout(state);
    case 'JOIN_ROOM':
      
      return joinRoom
    case 'LEAVE_ROOM':
      return
    case 'ADD_MESSAGE':
      return
    case 'USER_JOIN':
      return
    case 'USER_LEAVE':
      return
    default:
      return state;
  }
}
