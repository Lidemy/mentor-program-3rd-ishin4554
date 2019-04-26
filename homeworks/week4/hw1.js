const request = require('request');

request('https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (err, res, body) => {
    const obj = JSON.parse(body);
    obj.forEach(b => console.log(`${b.id} ${b.name}`));
  });
