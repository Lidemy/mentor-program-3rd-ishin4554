const userModel = require('../models/user_model');
const bcrypt = require('bcrypt');

const userController = {
  handleLogout: (req, res) => {
    userModel.deleteSession(req.body.id, (err, results) => {
      if(err) console.log(err);
    })
  },

  handleLogin: (req, res) => {
    userModel.get(req.body.username, (err, results) => {
      bcrypt.compare(req.body.password, results.password, (err, comparison) => {
        if(!err && comparison) {
          userModel.setSession(req.session.id, results.id, (err, result) => {
            if(err) console.log(err);
            res.json({
              state: 'success',
              session: req.session.id
            })
          })
        } else {
          res.json({state: 'fail'})
        }
      });
    });

  },

  handleRegister: (req, res) => {
    userModel.add(req.body, (err, results)=> {
      if (err) console.log(err);
      res.json({state: 'success'});
    });
  },
}

module.exports = userController