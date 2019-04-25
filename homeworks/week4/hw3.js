const request = require('request');
const process = require('process');

const method = process.argv[2];
const id = process.argv[3];
const newName = process.argv[4];

switch (method) {
  // Delete specific id book
  case 'delete':
    request.delete(`https://lidemy-book-store.herokuapp.com/books/${id}`,
      (err) => {
        if (err) {
          console.log(`Delete Error: ${err}`);
        }
        console.log('Delete success');
      });
    break;
  // Create new book with name
  case 'create':
    request.post({
      url: 'https://lidemy-book-store.herokuapp.com/books',
      form: {
        id: '',
        name: id,
      },
    },
    (err) => {
      if (err) {
        console.log(`Create Error: ${err}`);
      }
      console.log('Create success');
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
    (err) => {
      if (err) {
        console.log(`Update error: ${err}`);
      }
      console.log('Update success');
    });
    break;
  // Read specific id book
  case 'read':
    request.get(`https://lidemy-book-store.herokuapp.com/books/${id}`,
      (err, res, body) => {
        const obj = JSON.parse(body);
        console.log(obj.name);
      });
    break;
  // List first 20 books
  case 'list':
    request.get('https://lidemy-book-store.herokuapp.com/books?_limit=20',
      (err, res, body) => {
        const obj = JSON.parse(body);
        obj.forEach(b => console.log(b.name));
      });
    break;
  default:
    console.log('Please input the correct method.');
    break;
}
