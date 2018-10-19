import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from './Home';
import Jokes from './jokes/Jokes';
import AuthForm from './authentication/AuthForm';

class Routes extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={Home} exact />
        <Route path="/jokes" component={Jokes} />
        <Route path="/signin" component={AuthForm} />
        <Route path="/signup" component={AuthForm} />
      </div>
    );
  }
}

export default Routes;
