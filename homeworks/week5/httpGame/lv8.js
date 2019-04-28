const request = require('request');

const base = Buffer.from('admin:admin123').toString('base64');

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

function edit(ISBN, id) {
  request.patch({
    url: `https://lidemy-http-challenge.herokuapp.com/api/v2/books/${id}`,
    headers: {
      Authorization: `Basic ${base}`,
    },
    form: {
      ISBN,
    },
  },
  (err, res, body) => {
    console.log(body);
  });
}


const url = 'https://lidemy-http-challenge.herokuapp.com/api/v2/books?q=我';
const str = encodeURL(url);
console.log(str);

request.get('https://lidemy-http-challenge.herokuapp.com/lv8?token={HsifnAerok}',
  (err, res, body) => {
    console.log(body);
  });

request.get({
  url: str,
  headers: {
    Authorization: `Basic ${base}`,
  },
},
(err, res, body) => {
  const obj = JSON.parse(body);
  const editBook = obj.filter(item => item.author.length === 4)
    .filter(item => item.ISBN[item.ISBN.length - 1] === '7');
  const ISBN = editBook[0].ISBN.slice(0, -1).concat('3');
  const bookID = editBook[0].id;

  edit(ISBN, bookID);

  console.log(editBook);
});
