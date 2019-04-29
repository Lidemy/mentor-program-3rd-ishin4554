const request = require('request');

// guess number
function get(num) {
  request.get(`https://lidemy-http-challenge.herokuapp.com/lv2?token={HellOWOrld}&id=${num}`,
    (err, res, body) => {
      if (body !== '好像不是這本書耶...') {
        console.log(body);
        console.log(num);
      }
    });
}


request.get('https://lidemy-http-challenge.herokuapp.com/lv2?token={HellOWOrld}',
  (err, res, body) => {
    console.log(body);
  });

for (let i = 54; i <= 58; i += 1) {
  get(i);
}
