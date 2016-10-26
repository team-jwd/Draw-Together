import React from 'react';
import Axios from 'axios';
import jwtDecode from 'jwt-decode';

import store from '../../store';
import actions from '../../actions';

import LoginButton from './LoginButton.jsx';
import SignupButton from './SignupButton.jsx';
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';
import Card from './card.jsx';

/* eslint jsx-a11y/no-static-element-interactions: 0 */

export default class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signupFormVisible: false,
      loginFormVisible: false,
    };
    this.removeForm = this.removeForm.bind(this);
  }

  componentWillMount() {
    const token = localStorage.getItem('token');
    if (token) {
      const { username, firstName, lastName } = jwtDecode(token);
      store.dispatch(actions.login(username, firstName, lastName));
      this.toLandingView();
    }
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
        store.dispatch(actions.login(username, firstName, lastName));
        this.toLandingView();
      } else {
        // tell the user their name or pass was wrong
      }
    }).catch((error) => {
      if (error) throw error;
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
        // tell the user something
      }
    }).catch((error) => {
      throw error;
    });
  }

  showForm(formName) {
    const loginFormVisibility = formName === 'login';
    document.getElementById('lgn-view').style.opacity = '0.3';
    this.setState({
      loginFormVisible: loginFormVisibility,
      signupFormVisible: !loginFormVisibility,
    });
    const form = document.getElementById(`${formName}-form`).style;
    form.position = 'fixed';
    form.zIndex = 1000;
    form.height = '375px';
    form.width = '375px';
    form.margin = 'auto';
    form.top = '0';
    form.bottom = '0';
    form.left = '0';
    form.right = '0';
    form.opacity = '1';
    if (formName === 'login') {
      form.height = '225px';
    }
  }

  removeForm() {
    if (this.state.loginFormVisible || this.state.signupFormVisible) {
      this.setState({
        loginFormVisible: false,
        signupFormVisible: false,
      });
      document.getElementById('lgn-view').style.opacity = '1';
    }
  }

  render() {
    return (
      <div>
        <div id="ui-forms">
          <SignupForm
            onSubmit={this.handleSignupFormSubmit.bind(this)}
            display={this.state.signupFormVisible ? 'block' : 'none'}
          />
          <LoginForm
            onSubmit={this.handleLoginFormSubmit.bind(this)}
            display={this.state.loginFormVisible ? 'block' : 'none'}
          />
        </div>
        <main className="login-view" id="lgn-view" onClick={this.removeForm}>
          <div id="banner">
            <img src="./client/assets/Logo.png" alt="Draw Together" />
            <div>
              <h1>Drawing from a Distance</h1>
              <br />
              <p>DrawTogether is the simplest way for you and
              anyone else to draw together no matter
              where you are in the world</p>
            </div>
          </div>
          <div className="cards">
            <Card
              title="Interactive Whiteboarding"
              img="./client/assets/Pencil.png"
              alt="Pencil"
              description={`Work in real time on a digital whiteboard with your 
                friends and coworkers`}
            />
            <Card
              title="Live Video Chat"
              img="./client/assets/Camera.png"
              alt="Camera"
              description={`Have a live video chat with your collaborator to 
                give your design process a personal touch`}
            />
            <Card
              title="Simple Sign In"
              img="./client/assets/Person.png"
              alt="Person"
              description={`Don’t let a long sign up process slow you down. 
                Sign up in seconds and get drawing`}
            />
          </div>
          <div>
            <h2 id="bottom-text">Sign up or Log in to get started</h2>
          </div>
          <div id="user-interface">
            <div id="ui-buttons">
              <SignupButton
                onClick={this.showForm.bind(this, 'signup')}
              />
              <LoginButton
                onClick={this.showForm.bind(this, 'login')}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }
}
