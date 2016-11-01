import React from 'react';

export default class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
    };
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
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

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  render() {
    return (
      <div
        id="signup-form"
        style={{ display: this.props.display }}
      >
        <h4>Create your account by filling out the form below</h4>
        <p style={{ display: this.props.usernameAlreadyUsed ? 'block' : 'none' }} className="error">Sorry this username has already been taken</p>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          onChange={this.handleFirstNameChange}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          onChange={this.handleLastNameChange}
        />
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          onChange={this.handleUsernameChange}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          onChange={this.handleEmailChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          onChange={this.handlePasswordChange}
        />
        <button
          onClick={() =>
            this.props.onSubmit(
              this.state.username,
              this.state.password,
              this.state.firstName,
              this.state.lastName,
              this.state.email)}
        >
          Sign Up!
        </button>
      </div>
    );
  }
}
