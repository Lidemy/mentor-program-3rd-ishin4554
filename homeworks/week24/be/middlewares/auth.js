const jwt = require('jsonwebtoken');
const db = require('../models');
const STATE = require('../constants/state');

const { User } = db;

const checkAuth = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader) {
    jwt.verify(bearerHeader, 'my_secret_key', (err, { payload }) => {
      console.log(payload);
      if (err) {
        console.log(err);
      } else {
        User.findOne({ where: { id: payload.userId } }).then((result) => {
          if (result) {
            req.user = {
              id: result.id,
              username: result.username,
              nickname: result.nickname,
            };
            next();
          } else {
            res.json(STATE.FAIL.USERNAME_ERR);
            res.status(403).end();
          }
        });
      }
    });
  } else {
    res.json(STATE.FAIL.NOLOGIN_ERR);
    res.status(403).end();
  }
};

module.exports = { checkAuth };
