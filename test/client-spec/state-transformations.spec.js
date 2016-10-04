import { expect } from 'chai';
import { fromJS, Map } from 'immutable';

import {
  login, logout, joinRoom,
  leaveRoom, addMessage, userJoin,
  userLeave, INITIAL_STATE
} from './../../client/state-transformations';

describe('login', () => {
  const state = INITIAL_STATE;

  it('should add the logged in user to the state', () => {
    const newState = login(state, 'stevied', 'steven', 'dada');

    expect(newState).to.equal(fromJS({
      userData: {
        firstName: 'steven',
        lastName: 'dada',
        username: 'stevied'
      }
    }));
  });
});

describe('logout', () => {
  const state = INITIAL_STATE;

  it('should remove the logged in user', () => {
    const newState = login(state, 'stevied', 'steven', 'dada');

    expect(newState).to.equal(fromJS({
      userData: {
        firstName: 'steven',
        lastName: 'dada',
        username: 'stevied'
      }
    }));

    expect(logout(newState)).to.equal(Map())
  });
});

describe('joinRoom', () => {
  const state = login(INITIAL_STATE, 'stevied', 'steven', 'dada');

  it('should join the user to a room', () => {
    const newState = joinRoom(state, 'myRoom');

    expect(newState).to.equal(fromJS({
      userData: {
        firstName: 'steven',
        lastName: 'dada',
        username: 'stevied'
      },
      room: {
        name: 'myRoom'
      },
    }));
  });
});

describe('leaveRoom', () => {
  const state = fromJS({
    userData: {
      firstName: 'steven',
      lastName: 'dada',
      username: 'stevied'
    },
    room: {
      name: 'myRoom'
    },
  });

  it('should exit the user from the room', () => {
    const newState = leaveRoom(state);

    expect(newState).to.equal(fromJS({
      userData: {
        firstName: 'steven',
        lastName: 'dada',
        username: 'stevied'
      },
    }));
  });
});

describe('addMessage', () => {
  it('should add a message to the list', () => {
    const state = fromJS({
      userData: {
        firstName: 'steven',
        lastName: 'dada',
        username: 'stevied'
      },
      room: {
        name: 'myRoom',
        messages: [
          {username: 'stevied', text: 'hi sally'}
        ]
      },
    });

    const roomState = fromJS({
      name: 'myRoom',
      messages: [
        {username: 'stevied', text: 'hi sally'}
      ]
    });

    const newState = addMessage(roomState, 'sally12', 'Hello');

    expect(newState).to.equal(fromJS({
        name: 'myRoom',
        messages: [
          {username: 'stevied', text: 'hi sally'},
          {username: 'sally12', text: 'Hello'}
        ]
    }));
  });

  it('should create a message property if none exists', () => {
    const roomState = fromJS({
        name: 'myRoom',
    });

    const newState = addMessage(roomState, 'sally12', 'Hello');

    expect(newState).to.equal(fromJS({
      name: 'myRoom',
      messages: [
        {username: 'sally12', text: 'Hello'},
      ]
    }));
  });
});

describe('userJoin', () => {
  it('should add the other user to the room', () => {
    const roomState = fromJS({
      name: 'myRoom',
      otherUsers: ['jimmy', 'sandra']
    });

    const newState = userJoin(roomState, 'sally23');

    expect(newState).to.equal(fromJS({
      name: 'myRoom',
      otherUsers: ['jimmy', 'sandra', 'sally23']
    }));
  });

  it('should create the otherUsers property if none exists', () => {
    const roomState = fromJS({
      name: 'myRoom',
    });

    const newState = userJoin(roomState, 'sally23');

    expect(newState).to.equal(fromJS({
      name: 'myRoom',
      otherUsers: ['sally23']
    }));
  });
});

describe('userLeave', () => {
  it('should remove the user from the room', () => {
    const roomState = fromJS({
      name: 'myRoom',
      otherUsers: ['jimmy', 'sandra']
    });

    const newState = userLeave(roomState, 'jimmy');

    expect(newState).to.equal(fromJS({
      name: 'myRoom',
      otherUsers: ['sandra']
    }));
  });

  it('should not remove any users if the provided username is not present', () => {
    const roomState = fromJS({
      name: 'myRoom',
      otherUsers: ['jimmy', 'sandra']
    });

    const newState = userLeave(roomState, 'this should not matter');

    expect(newState).to.equal(roomState);
  });
});
