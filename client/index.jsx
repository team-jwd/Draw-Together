import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducer';
import App from './components/app.jsx';
import LoginView from './components/LoginView/LoginView.jsx';
import LandingView from './components/LandingView/LandingView.jsx';
import RoomView from './components/RoomView/RoomView.jsx';

const store = createStore(reducer);

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
