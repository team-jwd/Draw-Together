import React from 'react';
import io from 'socket.io-client';

import store from '../../store';
import actions from '../../actions';

import LoginButton from './LoginButton.jsx';
import SignupButton from './SignupButton.jsx';
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';

const socket = io().connect('http://localhost');


export default class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signupFormVisible: false,
      loginFormVisible: false,
    };
  }

  toLandingView() {
    this.props.history.push('/dashboard');
  }

  handleLoginFormSubmit(username, password) {
    // Need to get user's first name and last name from database
    socket.emit('login', { username, password }, (conf) => {
      if (conf) {
        store.getState();
        store.dispatch(actions.login(username, 'jimmy', 'lee'));
        this.toLandingView();
      }
    });
  }

  handleSignupFormSubmit(username, password, firstName, lastName) {
    // Same, need to get user's firstname and last name from database
    socket.emit('signup', { username, password, firstName, lastName }, (conf) => {
      if (conf) {
        store.dispatch(actions.login(username, firstName, lastName));
        this.toLandingView();
      }
    });
  }

  showForm(formName) {
    const loginFormVisibility = formName === 'login';
    this.setState({
      loginFormVisible: loginFormVisibility,
      signupFormVisible: !loginFormVisibility,
    });
  }

  render() {
    return (
      <div className="LoginView">
        <h1>BoardRoom.</h1>
        <SignupButton
          onClick={this.showForm.bind(this, 'signup')}
          />
        <LoginButton
          onClick={this.showForm.bind(this, 'login')}
          />
        <SignupForm
          onSubmit={this.handleSignupFormSubmit.bind(this)}
          display={this.state.signupFormVisible ? 'block' : 'none'}
          />
        <LoginForm
          onSubmit={this.handleLoginFormSubmit.bind(this)}
          display={this.state.loginFormVisible ? 'block' : 'none'}
          />
      </div>
    );
  }
}
