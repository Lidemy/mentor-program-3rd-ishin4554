
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    category: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
  }, {});
  Post.associate = function (models) {
    Post.hasMany(models.Tag),
    Post.belongsTo(models.User);
  };
  return Post;
};
