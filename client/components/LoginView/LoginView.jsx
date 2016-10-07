import React from 'react';
import io from 'socket.io-client';
import Axios from 'axios';

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
    Axios.post('/login', {
      username,
      password,
    }).then((response) => {
      const token = response.data.token;
      const { firstName, lastName } = response.data.user;
      if (token) {
        localStorage.setItem('token', token);
        store.getState();
        store.dispatch(actions.login(username, firstName, lastName));
        this.toLandingView();
      } else {
        console.log('do something to tell them the username or password was wrong');
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  handleSignupFormSubmit(username, password, firstName, lastName) {
    Axios.post('/signup', {
      username,
      password,
      firstName,
      lastName,
    }).then((response) => {
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        store.dispatch(actions.login(username, firstName, lastName));
        this.toLandingView();
      } else {
        console.log('tell the user that their username was already taken');
      }
    }).catch((error) => {
      throw error;
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
