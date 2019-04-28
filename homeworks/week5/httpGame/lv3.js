const request = require('request');

request.get('https://lidemy-http-challenge.herokuapp.com/lv3?token={5566NO1}',
  (err, res, body) => {
    console.log(body);
  });

request.post({
  url: 'https://lidemy-http-challenge.herokuapp.com/api/books',
  form: {
    name: '大腦喜歡這樣學',
    ISBN: '9789863594475',
  },
},
(err, res, body) => {
  console.log(body);
});

request.get('https://lidemy-http-challenge.herokuapp.com/lv3?token={5566NO1}&id=1989',
  (err, res, body) => {
    console.log(body);
  });
