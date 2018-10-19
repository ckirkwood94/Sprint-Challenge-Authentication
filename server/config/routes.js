const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');

const { authenticate, tokenGenerator, secret } = require('./middlewares');

module.exports = (server) => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  const { username, password } = req.body;
  const credentials = { username, password };
  const hash = bcrypt.hashSync(credentials.password, 14);
  credentials.password = hash;
  db('users')
    .insert(credentials)
    .then((ids) => {
      const id = ids[0];
      res.status(201).json({ newUserId: id });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

function login(req, res) {
  const { username, password } = req.body;
  const creds = { username, password };

  db('users')
    .where({ username: creds.username })
    .first()
    .then((user) => {
      console.log(user);
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = tokenGenerator(user);
        res.status(200).json({ welcome: user.username, token });
      } else
        res
          .status(500)
          .json({ error: 'Error logging in with username and password' });
    });
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
