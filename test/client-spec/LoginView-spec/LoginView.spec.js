// import React from 'react';
// import { mount, shallow } from 'enzyme';
// import { expect } from 'chai';

// import LoginView from '../../../client/components/LoginView/LoginView.jsx';
// import LoginButton from '../../../client/components/LoginView/LoginButton.jsx';
// import SignupButton from '../../../client/components/LoginView/SignupButton.jsx';
// import LoginForm from '../../../client/components/LoginView/LoginForm.jsx';
// import SignupForm from '../../../client/components/LoginView/SignupForm.jsx';

// describe('<LoginView />', () => {
//   let wrapper;

//   beforeEach(() => {
//     wrapper = mount(<LoginView />);
//   });

//   it('contains a LoginButton component', () => {
//     expect(wrapper.find(LoginButton)).to.have.length(1);
//   });

//   it('contains a SignupButton component', () => {
//     expect(wrapper.find(SignupButton)).to.have.length(1);
//   });

//   it('contains a LoginForm component', () => {
//     expect(wrapper.find(LoginForm)).to.have.length(1);
//   });

//   it('contains a SignupForm component', () => {
//     expect(wrapper.find(SignupForm)).to.have.length(1);
//   });

//   it('reveals LoginForm when LoginButton is clicked', () => {
//     expect(wrapper.state().loginFormVisible).to.be.false;
//     wrapper.find(LoginButton).find('button').simulate('click');
//     expect(wrapper.state().loginFormVisible).to.be.true;
//     expect(wrapper.state().signupFormVisible).to.be.false;
//   });

//   it('reveals SignupForm when SignupButton is clicked', () => {
//     expect(wrapper.state().signupFormVisible).to.be.false;
//     wrapper.find(SignupButton).find('button').simulate('click');
//     expect(wrapper.state().signupFormVisible).to.be.true;
//     expect(wrapper.state().loginFormVisible).to.be.false;
//   });
// });
