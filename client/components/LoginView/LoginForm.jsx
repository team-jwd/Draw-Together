import React from 'react';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    const state = this.state;
    return (
      <div
        id="login-form"
        style={{ display: this.props.display }}
      >
        <h4>Login using your email or password</h4>
        <p style={{ display: this.props.usernameOrPasswordWrong ? 'block' : 'none' }} className="error">Sorry the username or password was incorrect</p>
        <label htmlFor="login-user">Username or Email</label>
        <input
          type="text"
          id="login-user"
          onChange={this.handleUsernameChange}
        />
        <label htmlFor="login-password">Password</label>
        <input
          type="password"
          id="login-password"
          onChange={this.handlePasswordChange}
        />
        <button
          onClick={() => this.props.onSubmit(state.username, state.password)}
        >Login!</button>
      </div>
    );
  }
}
