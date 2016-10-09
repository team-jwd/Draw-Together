import React from 'react';
import { connect } from 'react-redux';
import NavigationMenu from './NavigationMenu.jsx';
import NavigationTitle from './NavigationTitle.jsx';
import NavigationHamburger from './NavigationHamburger.jsx';
import UserInfo from './UserInfo';

class NavigationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigationMenuVisible: false,
    };
    this.showMenu = this.showMenu.bind(this);
    this.handleMenuSelection = this.handleMenuSelection.bind(this);
  }

  toLandingView() {
    this.props.history.push('/dashboard');
  }

  toLogout() {
    this.props.history.push('/');
  }

  showMenu(e) {
    e.preventDefault();
    this.setState({
      navigationMenuVisible: !this.state.navigationMenuVisible,
    });
  }

  handleMenuSelection(e) {
    e.preventDefault();
    if (e.target.value === 'profile') {
      this.props.history.push('/dashboard');
    } else if (e.target.value === 'logout') {
      localStorage.removeItem('token');
      this.toLogout();
    }
  }

  render() {
    return (
      <header id="navigation-container">
        <NavigationTitle />
        <UserInfo username={this.props.username} />
        <NavigationHamburger onClick={this.showMenu} />
        <NavigationMenu
          display={this.state.navigationMenuVisible ? 'inline-block' : 'none'}
          onClick={this.handleMenuSelection}
        />
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.getIn(['userData', 'username']),
  };
}

export default connect(mapStateToProps)(NavigationContainer);

