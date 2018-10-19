import React, { Component } from 'react';
import axios from 'axios';

class AuthForm extends Component {
  state = {
    username: '',
    password: '',
  };

  path = this.props.location.pathname;

  handleInput = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.path === '/signin') {
      const endpoint = 'http://localhost:3300/api/login';
      console.log(this.state);
      axios
        .post(endpoint, this.state)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem('jwt', res.data.token);
          this.props.history.push('/jokes');
        })
        .catch((err) => {
          console.error('ERROR', err);
        });
    } else {
      const user = {
        username: this.state.username,
        password: this.state.password,
      };

      if (!user.username || !user.password) {
        //do nothing
        alert('Please fill in username and password');
      } else {
        axios
          .post('http://localhost:3300/api/register', user)
          .then((response) => {
            console.log(response.data);
            localStorage.setItem('jwt', response.data.token);
            this.props.history.push('/signin');
          })
          .catch((err) => console.log(err));

        this.setState({ username: '', password: '' });
      }
    }
  };

  render() {
    console.log(this.path);
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            value={this.state.username}
            onChange={this.handleInput}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            value={this.state.password}
            onChange={this.handleInput}
            type="password"
          />
        </div>
        <div>
          <button type="submit">
            {this.path === '/signin' ? 'Login' : 'Register'}
          </button>
        </div>
      </form>
    );
  }
}

export default AuthForm;
