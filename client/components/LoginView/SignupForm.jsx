import React from 'react';

export default class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
    };
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleFirstNameChange(e) {
    this.setState({ firstName: e.target.value });
  }

  handleLastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div
        className="signup-form"
        style={{ display: this.props.display }}
      >
        <input
          id="firstName"
          type="text"
          placeholder="First name"
          onChange={this.handleFirstNameChange}
        />
        <input
          id="lastName"
          type="text"
          placeholder="Last name"
          onChange={this.handleLastNameChange}
        />
        <input
          id="username"
          type="text"
          placeholder="username"
          onChange={this.handleUsernameChange}
        />
        <input
          id="password"
          type="text"
          placeholder="password"
          onChange={this.handlePasswordChange}
        />
        <button
          onClick={() => this.props.onSubmit(this.state.username, this.state.password, this.state.firstName, this.state.lastName)}
        >
          Sign up!
        </button>
      </div>
    );
  }
}
