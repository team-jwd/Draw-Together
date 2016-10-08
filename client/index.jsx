import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';

import store from './store';
import App from './components/app.jsx';
import LoginView from './components/LoginView/LoginView.jsx';
import LandingView from './components/LandingView/LandingView.jsx';
import RoomView from './components/RoomView/RoomView.jsx';

import scss from './styles/style.scss';


ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route component={App}>
        <Route path="/" component={LoginView} />
        <Route path="/dashboard" component={LandingView} />
        <Route path="/room" component={RoomView} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('container')
);
