export default {
  login(username, firstName, lastName) {
    return {type: 'LOGIN', username, firstName, lastName};
  },

  logout() {
    return {type: 'LOGOUT'}
  },

  joinRoom(roomName) {
    return {type: 'JOIN_ROOM', name: roomName}
  },

  leaveRoom() {
    return {type: 'LEAVE_ROOM'}
  },

  addMessage(username, text) {
    return {type: 'ADD_MESSAGE', username, text}
  },

  userJoin(username) {
    return {type: 'USER_JOIN', username}
  },

  userLeave(username) {
    return {type: 'USER_LEAVE', username}
  }
}

// export function login(username, firstName, lastName) {
//   return {type: 'LOGIN', username, firstName, lastName};
// }
//
// export function logout() {
//   return {type: 'LOGOUT'}
// }
//
// export function joinRoom(roomName) {
//   return {type: 'JOIN_ROOM'}
// }
//
// export function leaveRoom() {
//   return {type: 'LEAVE_ROOM'}
// }
//
// export function addMessage(username, text) {
//   return {type: 'ADD_MESSAGE', username, text}
// }
//
// export function userJoin(username) {
//   return {type: 'USER_JOIN', username}
// }
//
// export function userLeave(username) {
//   return {type: 'USER_LEAVE', username}
// }
