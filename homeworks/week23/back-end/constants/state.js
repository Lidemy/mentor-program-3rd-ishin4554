const STATE = {
  SUCCESS: {
    message: 'success',
  },
  FAIL: {
    PASSWORD_ERR: {
      message: 'wrong password',
    },
    USERNAME_ERR: {
      message: 'no user',
    },
    NOLOGIN_ERR: {
      message: 'not login',
    },
  },
};
module.exports = STATE;
