import React from 'react';

import LoginButton from './LoginButton.jsx';
import SignupButton from './SignupButton.jsx';
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';

export default props =>
  <div className="LoginView">
    <h1>BoardRoom.</h1>
    <SignupButton />
    <LoginButton />
    <SignupForm />
    <LoginForm />
  </div>;
