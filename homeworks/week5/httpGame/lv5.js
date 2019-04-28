const request = require('request');

const id = 23;

request.get('https://lidemy-http-challenge.herokuapp.com/lv5?token={HarukiMurakami}',
  (err, res, body) => {
    console.log(body);
  });

request.delete(`https://lidemy-http-challenge.herokuapp.com/api/books/${id}`,
  (err, res, body) => {
    console.log(body);
  });
