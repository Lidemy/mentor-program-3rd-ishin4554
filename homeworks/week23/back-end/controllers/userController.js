const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const STATE = require('../constants/state');
const KEY = require('../constants/key');

const { User } = db;

const userController = {
  userLogin: (req, res) => {
    User.findOne({
      where: { username: req.body.username },
    }).then((user) => {
      bcrypt.compare(req.body.password, user.password).then((result) => {
        if (result) {
          const payload = {
            userId: user.id,
            username: user.username,
          };
          const token = jwt.sign({
            payload,
            exp: Math.floor(Date.now() / 1000) + (60 * 15),
          },
          KEY);
          res.json({
            ...STATE.SUCCESS,
            token,
          });
        } else {
          res.json(STATE.FAIL.PASSWORD_ERR);
          res.status(500).end();
        }
      }).catch((err) => {
        res.json(STATE.FAIL.PASSWORD_ERR);
        res.status(500).end();
      });
    }).catch((err) => {
      res.json(STATE.FAIL.USERNAME_ERR);
      res.status(500).end();
    });
  },

  userPost: (req, res) => {
    console.log(req.body);
    const user = {
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 10),
    };

    User.create(user)
      .then(() => res.json(STATE.SUCCESS))
      .catch((err) => {
        console.log(err);
        res.status(500).end();
      });
  },
};

module.exports = userController;
