const postModel = require('../models/post_model');
const errorHandling = (err, results) => {
  if(err) console.log(err);  
}

const postController = {
  handleGetPosts: (req, res) => {
    postModel.getAll((err, results)=> {
      if(err) console.log(err);
      const postTags = results.reduce((acc, cur) => {
        (acc[cur['id']] = acc[cur['id']] || []).push(cur)
        return acc;
      },[])
      const posts = [];
      Object.keys(postTags).forEach(id => {
        const tags = postTags[id].reduce((arr, cur) => {
          if(cur.tags) arr.push(cur.tags)
          return arr
        }, [])
        postTags[id][0].tags = tags;
        posts.push(postTags[id][0])
      })
      res.json(posts);
    });
  },

  handleGetPost: (req, res) => {
    postModel.get(req.params.id, (err, results)=> {
      if(err) console.log(err);
      res.json(results);
    });
  },

  handleAddPost: async (req, res) => {
    postModel.add(req.body, (err, results) => {
      if(err) console.log(err);
      postModel.getTitlePost(req.body.title ,(err, result)=> {
        if(err) console.log(err);
        postModel.addTags(result.id, req.body.tags, errorHandling);
        res.json({state:'success'})
      });
    });
  },

  handleDeletePost: (req, res) => {
    postModel.delete(req.params.id, (err, results)=> {
      if(err) console.log(err);
      res.json({
        state: 'delete success'
      });    
    });
  },

  handleUpdatePost: async (req, res) => {
    const postId = req.params.id;
    postModel.update(req.body, postId, (err, results)=> {
      if(err) console.log(err);
    })
    postModel.getArticleTags(postId, (err, results) => {
      if(err) console.log(err);
      const updateTags = req.body.tags;
      const newTags = updateTags.filter(tag => !results.filter(result => result.tag === tag).length)
      const deleteTags = results.filter(tag => !updateTags.includes(tag.tag))
      postModel.addTags(postId, newTags, errorHandling);
      postModel.deleteTags(postId, deleteTags, errorHandling);
    })
    res.json({state: 'success'});
  },

  handleGetTags: (req, res) => {
    postModel.getAllTags(req.params.id, (err, results)=> {
      if(err) console.log(err);
      res.json(results);
    })
  },

  handleGetCategories: (req, res) => {
    postModel.getAllCategories((err, results)=> {
      if(err) console.log(err);
      res.json(results);
    })
  }
}

module.exports = postController