const request = require('request');

function encodeURL(url) {
  let asciiUrl = url;
  asciiUrl = encodeURIComponent(url);
  asciiUrl = asciiUrl.replace(/%3A/g, ':');
  asciiUrl = asciiUrl.replace(/%2F/g, '/');
  asciiUrl = asciiUrl.replace(/%3F/g, '?');
  asciiUrl = asciiUrl.replace(/%3D/g, '=');
  asciiUrl = asciiUrl.replace(/%26/g, '&');

  return asciiUrl;
}

const url = 'https://lidemy-http-challenge.herokuapp.com/api/books?q=世界';
const str = encodeURL(url);

request.get('https://lidemy-http-challenge.herokuapp.com/lv4?token={LEarnHOWtoLeArn}',
  (err, res, body) => {
    console.log(body);
  });

request.get(str,
  (err, res, body) => {
    const obj = JSON.parse(body);
    console.log(obj);
  });

request.get('https://lidemy-http-challenge.herokuapp.com/lv4?token={LEarnHOWtoLeArn}&id=79',
  (err, res, body) => {
    console.log(body);
  });
