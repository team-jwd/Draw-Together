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
    return (
      <div className="login-form" style={{ display: this.props.display }}>
        <input type="text" placeholder="username" onChange={this.handleUsernameChange} />
        <input type="text" placeholder="password" onChange={this.handlePasswordChange} />
        <button onClick={() => this.props.onSubmit(this.state.username, this.state.password)}>Log in!</button>
      </div>
    );
  }
}
