const express = require('express');

const router = express.Router();

const auth = require('../middlewares/auth');
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');

router.get('/', (req, res) => res.end('hello'));
router.get('/posts', postController.getPosts);
router.get('/posts/:id', postController.getPost);
router.get('/categories', postController.getCategories);
router.get('/tags', postController.getTags);
router.post('/posts', auth.checkAuth, postController.addPost);
router.delete('/posts/:id', auth.checkAuth, postController.deletePost);
router.patch('/posts/:id', auth.checkAuth, postController.udpatePost);
router.post('/users', userController.userPost);
router.post('/login', userController.userLogin);

module.exports = router;
