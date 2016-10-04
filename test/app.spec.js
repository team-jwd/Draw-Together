import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect, assert} from 'chai';


import App from '../client/components/app';

const wrapper = shallow(<App/>);
console.log(typeof wrapper.find('input').length);
expect(wrapper.find('input')).to.have.length(1);
assert.lengthOf(wrapper.find('input'), 1, 'foo`s value has a length of 1');
