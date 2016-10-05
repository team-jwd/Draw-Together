import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { expect } from 'chai';

/* eslint max-len: ["error", { "ignoreStrings": true }] */
import Canvas from '../../../client/components/RoomView/Canvas/Canvas.jsx';

describe('<Canvas />', () => {
  it('should have a canvas element', () => {
    const wrapper = mount(<Canvas />);
    expect(wrapper.find('canvas')).to.have.length(1);
  });
});