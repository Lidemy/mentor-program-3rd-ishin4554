const db = require('../db')
const bcrypt = require('bcrypt');

const userModel = {
  deleteSession: (sid, cb) => {
    db.query(
      'DELETE FROM posts WHERE id = ?',
      [sid],
      (err) => {
        if (err) return cb(err);
        cb(null);
      }
    )
  }, 

  setSession: (sid, user_id, cb) => {
    db.query(
      'INSERT INTO session(id, user_id) values(?, ?)',
      [sid, user_id],
      (err, results) => {
        if (err) return cb(err);
        cb(null);
      }
    )
  }, 

  add: (user, cb) => {
    console.log(user);
    bcrypt.hash(user.password, 10, (err, hash) => {
      db.query(
        'INSERT INTO users(username, password, nickname) values(?, ?, ?)',
        [user.username, hash, user.nickname],
        (err, results) => {
          if (err) return cb(err);
          cb(null);
        }
      )
    });

  },

  get: (username, cb) => {
    db.query(
      'SELECT * FROM users WHERE username = ?',
      [username],
      (err, results) => {
        if (err) return cb(err);
        cb(null, results[0])
      }
    )
  }
}

module.exports = userModel; 