const Sequelize = require('sequelize');
const db = require('../models');

const { sequelize } = db;
const STATE = require('../constants/state');

const { Post } = db;
const { Tag } = db;
const { Op } = Sequelize;

const postController = {
  getPosts: (req, res) => {
    Post.findAll({
      attributes: ['id', 'title', 'imgUrl', 'category'],
      include: [{
        model: Tag,
        attributes: ['name'],
      }],
      where: {
        category: req.query.category,
      },
    }).then((list) => {
      console.log(list);
      res.json(list);
    }).catch((err) => {
      console.log(err);
      res.json([]);
    });
  },

  getPost: (req, res) => {
    Post.findOne({
      include: [{
        model: db.Tag,
        attributes: ['name'],
      }],
      where: {
        id: req.params.id,
      },
    }).then((item) => {
      res.json(item);
    }).catch((err) => {
      console.log(err);
      res.json([]);
    });
  },

  getCategories: (req, res) => {
    Post.aggregate('category', 'DISTINCT', { plain: false })
      .then((list) => {
        res.json(list);
      }).catch((err) => {
        console.log(err);
        res.json([]);
      });
  },

  getTags: (req, res) => {
    Tag.aggregate('name', 'DISTINCT', { plain: false })
      .then((list) => {
        res.json(list);
      }).catch((err) => {
        console.log(err);
        res.json([]);
      });
  },

  addPost: async (req, res) => {
    if (!req.body.title) {
      return res.status(500).end();
    }
    try {
      sequelize.transaction(async (t) => {
        const post = await Post.create({
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
        });
        await Promise.all(req.body.tag.map(item => Tag.create({
          PostId: post.id,
          name: item,
        })));
        res.json(STATE.SUCCESS);
      });
    } catch (error) {
      console.log(err);
      res.status(500).end();
    }
  },

  deletePost: (req, res) => {
    try {
      sequelize.transaction(async (t) => {
        await Tag.destroy({
          where: { PostId: req.params.id },
        }, { transaction: t });
        await Post.destroy({
          where: { id: req.params.id },
        }, { transaction: t });
      });
      res.json(STATE.SUCCESS);
    } catch (error) {
      console.log(err);
      res.status(500).end();
    }
  },

  udpatePost: (req, res) => {
    try {
      sequelize.transaction(async (t) => {
        await Post.update({
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
        }, {
          where: { id: req.params.id },
        }, { transaction: t });

        await Tag.destroy({
          where: {
            PostId: req.params.id,
            name: { [Op.notIn]: req.body.tag },
          },
        }, { transaction: t });

        await Promise.all(req.body.tag.forEach((item) => {
          Tag.findOrCreate({
            where: {
              name: item,
              PostId: req.params.id,
            },
            defaults: { PostId: req.params.id },
            transaction: t,
          });
        }));

        res.json(STATE.SUCCESS);
      });
    } catch (err) {
      console.log(err);
      res.status(500).end();
    }
  },
};

module.exports = postController;
