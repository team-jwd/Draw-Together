import React from 'react';

export default class NavigationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  toLogout() {
    this.props.history.push('/');
  }

  handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    this.toLogout();
  }

  render() {
    return (
      <header id="navigation-container">
        <h3>DrawTogether</h3>
        <button onClick={this.handleLogout}>Logout</button>
      </header>
    );
  }
}
