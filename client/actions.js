export default {
  login(username, firstName, lastName) {
    return { type: 'LOGIN', username, firstName, lastName };
  },

  logout() {
    return { type: 'LOGOUT' };
  },

  joinRoom(name) {
    return { type: 'JOIN_ROOM', name };
  },

  leaveRoom() {
    return { type: 'LEAVE_ROOM' };
  },

  addMessage(username, text) {
    return { type: 'ADD_MESSAGE', username, text };
  },

  userJoin(username) {
    return { type: 'USER_JOIN', username };
  },

  userLeave(username) {
    return { type: 'USER_LEAVE', username };
  },
};
