const request = require('request');
const process = require('process');

if (process.argv[2] === 'read') {
  request(`https://lidemy-book-store.herokuapp.com/books/${process.argv['3']}`,
    (err, res, body) => {
      const obj = JSON.parse(body);
      console.log(obj.name);
    });
} else if (process.argv[2] === 'list') {
  request('https://lidemy-book-store.herokuapp.com/books?_limit=20',
    (err, res, body) => {
      const obj = JSON.parse(body);
      obj.forEach(b => console.log(`${b.id} ${b.name}`));
    });
}
