import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

/* eslint max-len: ["error", { "ignoreStrings": true }] */
import CanvasControls from '../../../client/components/RoomView/Canvas/CanvasControls.jsx';

describe('<CanvasControls />', () => {
  it('should have a select menu for colors, width, and draw type', () => {
    const wrapper = mount(<CanvasControls />);
    expect(wrapper.find('#strokeStyle')).to.be.a('object');
    expect(wrapper.find('#lineWidth')).to.be.a('object');
    expect(wrapper.find('#drawType')).to.be.a('object');
  });

  it('should have functions passed as props to update the state in the parent component', () => {
    const wrapper = shallow(<CanvasControls />);
    expect(wrapper.props().strokeChanged).to.be.defined;
    expect(wrapper.props().drawTypeChanged).to.be.defined;
    expect(wrapper.props().widthChanged).to.be.defined;
  });
});
