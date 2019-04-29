const request = require('request');

const base = Buffer.from('admin:admin123').toString('base64');

function get(mail) {
  request.get(`https://lidemy-http-challenge.herokuapp.com/lv6?token={CHICKENCUTLET}&email=${mail}`,
    (err, res, body) => {
      console.log(body);
    });
}

request.get('https://lidemy-http-challenge.herokuapp.com/lv6?token={CHICKENCUTLET}',
  (err, res, body) => {
    console.log(body);
  });

request.get({
  url: 'https://lidemy-http-challenge.herokuapp.com/api/v2/me',
  headers: {
    Authorization: `Basic ${base}`,
  },
},
(err, res, body) => {
  console.log(body);
  const obj = JSON.parse(body);
  get(obj.email);
});
