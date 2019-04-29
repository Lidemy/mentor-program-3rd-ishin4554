const request = require('request');

const base = Buffer.from('admin:admin123').toString('base64');

function get(ver) {
  request.get(`https://lidemy-http-challenge.herokuapp.com/lv9?token={NeuN}&version=${ver}`,
    (err, res, body) => {
      console.log(body);
    });
}

request.get('https://lidemy-http-challenge.herokuapp.com/lv9?token={NeuN}',
  (err, res, body) => {
    console.log(body);
  });


request.get({
  url: 'https://lidemy-http-challenge.herokuapp.com/api/v2/sys_info',
  headers: {
    Authorization: `Basic ${base}`,
    'X-Library-Number': 20,
    'User-Agent': 'Mozilla/5.0 (Windows; U; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727)',
  },
},
(err, res, body) => {
  const obj = JSON.parse(body);
  get(obj.version);
});
