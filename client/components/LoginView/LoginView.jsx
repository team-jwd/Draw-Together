import React from 'react';

import LoginButton from './LoginButton.jsx';
import SignupButton from './SignupButton.jsx';
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';

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
          onSubmit={this.toLandingView.bind(this)}
          display={this.state.signupFormVisible ? 'block' : 'none'}
        />
        <LoginForm
          onSubmit={this.toLandingView.bind(this, this.props.history)}
          display={this.state.loginFormVisible ? 'block' : 'none'}
        />
      </div>
    );
  }
}
