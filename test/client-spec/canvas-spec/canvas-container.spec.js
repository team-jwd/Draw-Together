import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

/* eslint max-len: ["error", { "ignoreStrings": true }] */
import CanvasContainer from '../../../client/components/RoomView/Canvas/CanvasContainer.jsx';
import Canvas from '../../../client/components/RoomView/Canvas/Canvas.jsx';
import CanvasControls from '../../../client/components/RoomView/Canvas/CanvasControls.jsx';

describe('<CanvasContainer />', () => {
  it('contains a Canvas Component', () => {
    const wrapper = mount(<CanvasContainer />);
    expect(wrapper.find(Canvas)).to.have.length(1);
  });

  it('contains a Canvas Controller Component', () => {
    const wrapper = mount(<CanvasContainer />);
    expect(wrapper.find(CanvasControls)).to.have.length(1);
  });

  // it('should have an initial state for line color', () => {
  //   const wrapper = mount(<CanvasContainer />);
  //   expect(wrapper.state().strokeStyle).to.equal('black');
  // });

  // it('should have an initial state for line width', () => {
  //   const wrapper = mount(<CanvasContainer />);
  //   expect(wrapper.state().lineWidth).to.equal('5');
  // });

  // it('should have an initial state for drawType', () => {
  //   const wrapper = mount(<CanvasContainer />);
  //   expect(wrapper.state().drawType).to.equal('write');
  // });

  // it('should update the lineColor state on change of select', () => {
  //   const wrapper = mount(<CanvasContainer />);
  //   wrapper.find('#color').simulate('change', { target: { value: 'blue' } });
  //   expect(wrapper.state().strokeStyle).to.equal('blue');
  // });

  // it('should update the lineWidth state on change of select', () => {
  //   const wrapper = mount(<CanvasContainer />);
  //   wrapper.find('#width').simulate('change', { target: { value: '10' } });
  //   expect(wrapper.state().lineWidth).to.equal('10');
  // });

  // it('should update the drawType state on change of select', () => {
  //   const wrapper = mount(<CanvasContainer />);
  //   wrapper.find('#draw-erase').simulate('change', { target: { value: 'erase' } });
  //   expect(wrapper.state().drawType).to.equal('erase');
  // });
});
