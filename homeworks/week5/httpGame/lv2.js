const request = require('request');

request.get('https://lidemy-http-challenge.herokuapp.com/lv2?token={HellOWOrld}',
  (err, res, body) => {
    console.log(body);
  });

request.get('https://lidemy-http-challenge.herokuapp.com/api/books',
  (err, res, body) => {
    const obj = JSON.parse(body);
    console.log(obj);
  });

request.get('https://lidemy-http-challenge.herokuapp.com/lv2?token={HellOWOrld}&id=56',
  (err, res, body) => {
    console.log(body);
  });
