const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const routes = require('./routes');
const db = require('./models');

const app = express();
const port = process.env.PORT || 5001;

app.use(express.static(path.join(__dirname, '/../client/build')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  db.sequelize.sync();
  console.log(`Listening on port ${port}!`);
});

app.options('*', cors());
app.use('/v1/api', routes);
