const request = require('request');

request.get('https://lidemy-http-challenge.herokuapp.com/start',
  (err, res, body) => {
    console.log(body);
  });

request.get('https://lidemy-http-challenge.herokuapp.com/lv1?token={GOGOGO}',
  (err, res, body) => {
    console.log(body);
  });

request.get('https://lidemy-http-challenge.herokuapp.com/lv1?token={GOGOGO}&name={minw}',
  (err, res, body) => {
    console.log(body);
  });
