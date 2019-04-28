const request = require('request');

const base = Buffer.from('admin:admin123').toString('base64');


request.get('https://lidemy-http-challenge.herokuapp.com/lv7?token={SECurityIsImPORTant}',
  (err, res, body) => {
    console.log(body);
  });

request.delete({
  url: 'https://lidemy-http-challenge.herokuapp.com/api/v2/books/89',
  headers: {
    Authorization: `Basic ${base}`,
  },
},
(err, res, body) => {
  const obj = JSON.parse(body);
  console.log(obj.message);
});
