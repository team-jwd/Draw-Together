import { Map, List, fromJS } from 'immutable';

export const INITIAL_STATE = Map();

export function login(state, username, firstName, lastName) {
  return state.set('userData', Map({username, firstName, lastName}));
}

export function logout(state) {
  return state.delete('userData');
}

export function joinRoom(state, name) {
  return state.set('room', fromJS({name}));
}

export function leaveRoom(state) {
  return state.delete('room');
}

export function addMessage(roomState, username, text) {
  return roomState.update('messages', List(), messages => {
    return messages.push(Map({username, text}));
  });
}

export function userJoin(roomState, username) {
  return roomState.update('otherUsers', List(), otherUsers => {
    return otherUsers.push(username);
  });
}

export function userLeave(roomState, username) {
  return roomState.update('otherUsers', otherUsers => {
    return otherUsers.filter(otherUser => otherUser !== username);
  });
}
