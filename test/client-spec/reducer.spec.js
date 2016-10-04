import { expect } from 'chai';
import { fromJS } from 'immutable';

import actions from './../../client/actions';
import reducer from './../../client/reducer';
import { INITIAL_STATE } from './../../client/state-transformations';



describe('reducer', () => {
  it('should apply the actions to the state', () => {
    let actionList = [
      actions.login('stevied', 'steven', 'dada'),
      actions.logout()
    ];

    const loggedIn = fromJS({
      userData: {
        username: 'stevied',
        firstName: 'steven',
        lastName: 'dada'
      }
    });

    expect(reducer(INITIAL_STATE, actions.login('stevied', 'steven', 'dada')))
      .to.equal(loggedIn);
    expect(actionList.reduce(reducer, INITIAL_STATE)).to.equal(INITIAL_STATE);

    actionList = [
      actions.login('stevied', 'steven', 'dada'),
      actions.joinRoom('myRoom')
    ]
    expect(actionList.reduce(reducer, INITIAL_STATE)).to.equal(fromJS({
      userData: {
        username: 'stevied',
        firstName: 'steven',
        lastName: 'dada'
      },
      room: {
        name: 'myRoom'
      }
    }));

    actionList = [
      actions.login('stevied', 'steven', 'dada'),
      actions.joinRoom('myRoom'),
      actions.leaveRoom()
    ];
    expect(actionList.reduce(reducer, INITIAL_STATE)).to.equal(fromJS({
      userData: {
        username: 'stevied',
        firstName: 'steven',
        lastName: 'dada'
      }
    }));

    actionList = [
      actions.login('stevied', 'steven', 'dada'),
      actions.joinRoom('myRoom'),
      actions.addMessage('sally', 'Hello')
    ];
    expect(actionList.reduce(reducer, INITIAL_STATE)).to.equal(fromJS({
      userData: {
        username: 'stevied',
        firstName: 'steven',
        lastName: 'dada'
      },
      room: {
        name: 'myRoom',
        messages: [
          {username: 'sally', text: 'Hello'}
        ]
      }
    }))
  });
});
