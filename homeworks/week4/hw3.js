const request = require('request');
const process = require('process');

const method = process.argv[2];
const id = process.argv[3];
const newName = process.argv[4];

switch (method) {
  // Delete specific id book
  case 'delete':
    request.delete(`https://lidemy-book-store.herokuapp.com/books/${id}`,
      () => {
        console.log(`Delete ${id}`);
      });
    break;
  // Create new book with name
  case 'create':
    request.post({
      url: 'https://lidemy-book-store.herokuapp.com/books',
      form: {
        id: '',
        name: process.argv[3],
      },
    },
    () => {
      console.log(`Create book ${process.argv[3]}`);
    });
    break;
  // Update specific id book's name
  case 'update':
    request.patch({
      url: `https://lidemy-book-store.herokuapp.com/books/${id}`,
      form: {
        name: newName,
      },
    },
    () => {
      console.log(`Create book ${newName}`);
    });
    break;
  // Read specific id book
  case 'read':
    request.get(`https://lidemy-book-store.herokuapp.com/books/${id}`,
      (err, res, body) => {
        const obj = JSON.parse(body);
        if (obj.name) {
          console.log(obj.name);
        } else {
          console.log(`item ${id} doesn't exist`);
        }
      });
    break;
  // List first 20 books
  case 'list':
    request.get('https://lidemy-book-store.herokuapp.com/books?_limit=20',
      (err, res, body) => {
        const obj = JSON.parse(body);
        obj.forEach(b => console.log(`${b.id} ${b.name}`));
      });
    break;
  default:
    console.log('Please input the correct method.');
    break;
}
