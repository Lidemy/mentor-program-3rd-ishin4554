const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser')
const path = require("path"); 

const userController = require('./controllers/user_controller')
const postController = require('./controllers/post_controller')

const app = express();

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret : 'secret', 
  resave : true,
  saveUninitialized: false, 
  cookie : {
    maxAge : 1000 * 60
  },
}));

app.use(express.static(path.join(__dirname, '/../client/build')));
app.post('/api/login', userController.handleLogin);
app.post('/api/logout', userController.handleLogout);
app.post('/api/register', userController.handleRegister);
app.get('/api/posts', postController.handleGetPosts);
app.get('/api/posts/:id', postController.handleGetPost);
app.post('/api/posts', postController.handleAddPost);
app.delete('/api/posts/:id', postController.handleDeletePost);
app.patch('/api/posts/:id', postController.handleUpdatePost);
app.get('/api/tags', postController.handleGetTags);
// app.get('/api/tags/:id', postController.handleGetPostTag);
app.get('/api/categories', postController.handleGetCategories);


app.listen(process.env.PORT || 5001)