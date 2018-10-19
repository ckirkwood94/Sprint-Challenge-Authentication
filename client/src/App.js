import React, { Component } from 'react';

import './styles/App.css';
import Nav from './components/Nav';
import Routes from './components/Routes';

class App extends Component {
  render() {
    console.log('app.js', this.props);
    return (
      <div className="App">
        <Nav />
        <Routes />
      </div>
    );
  }
}

export default App;
