import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

class Nav extends Component {
  signout = () => {
    localStorage.removeItem('jwt');
    this.props.history.push('/signin');
  };

  render() {
    console.log(this.props);
    return (
      <nav>
        <NavLink to="/" exact>
          Home
        </NavLink>
        &nbsp;|&nbsp;
        <NavLink to="/jokes">Jokes</NavLink>
        &nbsp;|&nbsp;
        <NavLink to="/signin">Login</NavLink>
        &nbsp;|&nbsp;
        <NavLink to="/signup">Register</NavLink>
        &nbsp;|&nbsp;
        <button onClick={this.signout}>Signout</button>
      </nav>
    );
  }
}

export default withRouter(Nav);
