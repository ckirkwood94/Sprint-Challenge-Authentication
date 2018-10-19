const jwt = require('jsonwebtoken');

const jwtKey = require('../_secrets/keys').jwtKey;

// quickly see what this file exports
module.exports = {
  authenticate,
  tokenGenerator,
};

const secret = 'Fire&Ice%Luck*Misfortune(Peace$Fury)Light#Darkness!';

function tokenGenerator(user) {
  const payload = { username: user.username };
  const options = { expiresIn: '30m' };
  return jwt.sign(payload, secret, options);
}

// implementation details
function authenticate(req, res, next) {
  const token = req.get('Authorization');

  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.status(401).json(err);

      req.decoded = decoded;

      next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
}
