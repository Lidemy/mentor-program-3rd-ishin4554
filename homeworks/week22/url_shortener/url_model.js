const nanoid = require('nanoid');

const url_model = {
  add: (db, url) => {
    const shortenedURLs = db.collection('shortenedURLs');
    return shortenedURLs.findOneAndUpdate({ original_url: url },
      {
        $setOnInsert: {
          original_url: url,
          short_id: nanoid(7),
        },
      },
      {
        returnOriginal: false,
        upsert: true,
      });
  },
  get: (db, code) => db.collection('shortenedURLs').findOne({ short_id: code }),
};

module.exports = url_model;
