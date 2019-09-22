const db = require('../db')

const postModel = {
  getAll: (cb) => {
    db.query(
      `SELECT posts.*, posts_tags.tag AS tags
        FROM posts LEFT JOIN posts_tags ON posts.id=posts_tags.post_id`,
      (err, results) => {
        if (err) return cb(err);
        cb(null, results)
      }
    )
  },

  getArticleTags: (id, cb) => {
    db.query(
      `SELECT tag FROM posts_tags WHERE post_id=?`,
      [id],
      (err, results) => {
        if (err) return cb(err);
        cb(null, results)
      }
    )
  }, 

  get: (id, cb) => {
    db.query(
      'SELECT * FROM posts WHERE id = ?',
      [id],
      (err, results) => {
        if (err) return cb(err);
        cb(null, results[0])
      }
    )
  },

  add: (post, cb) => {
    console.log(post)
    db.query(
      'INSERT INTO posts(title, content, user_id, category) values(?, ?, ?, ?)',
      [post.title, post.content, post.user_id, post.category],
      (err) => {
        if (err) return cb(err);
        cb(null);
      }
    )
  },

  getTitlePost: (title, cb)=>{
    db.query(
      'SELECT id FROM posts WHERE title=?',
      [title],
      (err, results) => {
        if (err) return cb(err);
        cb(null, results[0]);
      }
    )
  },

  addTags: (id, tags, cb) => {
    tags.forEach(tag => {
      db.query(
        'INSERT INTO posts_tags(post_id, tag) values(?, ?)',
        [id, tag],
        (err) => {
          if (err) return cb(err);
          cb(null);
        }
      )
    })
  },

  deleteTags: (id, tags, cb) => {
    tags.forEach(tag => {
      db.query(
        'DELETE FROM posts_tags WHERE post_id = ? AND tag = ?',
        [id, tag.tag],
        (err) => {
          if (err) return cb(err);
          cb(null);
        }
      )
    })
  },

  delete: (id, cb) => {
    db.query(
      'DELETE FROM posts WHERE id = ?',
      [id],
      (err) => {
        if (err) return cb(err);
        cb(null);
      }
    )
  },

  update: (post, id, cb) => {
    db.query(
      'UPDATE posts SET title=?, content=?, category=? WHERE id=?',
      [post.title, post.content, post.category, id],
      (err) => {
        if (err) return cb(err);
        cb(null);
      }
    )
  },

  getAllTags: (id, cb) => {
    db.query(
      'SELECT DISTINCT tag FROM posts_tags',
      [id],
      (err, results) => {
        if (err) return cb(err)
        cb(null, results)
      }
    )
  },

  getAllCategories: (cb) => {
    db.query(
      'SELECT DISTINCT category FROM posts',
      (err, results) => {
        if (err) return cb(err);
        cb(null, results)
      }
    )
  }

}

module.exports = postModel; 