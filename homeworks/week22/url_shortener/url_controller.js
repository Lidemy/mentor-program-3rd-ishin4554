const dns = require('dns');
const url_model = require('./url_model');

const url = {
  addUrl: (req, res) => {
    let originalUrl;
    try {
      originalUrl = new URL(req.body.url);
    } catch (err) {
      return res.status(400).send({ error: 'invalid URL' });
    }

    dns.lookup(originalUrl.hostname, (err) => {
      if (err) {
        return res.status(404).send({ error: 'Address not found' });
      }

      const { db } = req.app.locals;
      url_model.add(db, originalUrl.href)
        .then((result) => {
          const doc = result.value;
          res.json({
            original_url: doc.original_url,
            short_id: doc.short_id,
          });
        })
        .catch(console.error);
    });
  },
  getUrl: (req, res) => {
    const shortId = req.params.short_id;
    const { db } = req.app.locals;
    url_model.get(db, shortId).then((doc) => {
      doc === null && res.send('Uh oh. We could not find a link at that URL');
      res.redirect(doc.original_url);
    })
      .catch(console.error);
  },
};

module.exports = url;
