import { expect } from 'chai';

import actions from './../../client/actions';

describe('actions', () => {
  it('should return the correct object', () => {
    let action = actions.login('stevied', 'steven' ,'dada');
    expect(action.username).to.equal('stevied');
    expect(action.firstName).to.equal('steven');
    expect(action.lastName).to.equal('dada');
    expect(action.type).to.equal('LOGIN')
  });
});
