import React from "react";
import { connect } from "react-redux";
import { Actions } from "../actions";
import Article from "../components/article";

const ArticleContainer = props => <Article {...props} />;

const mapStateToProps = store => ({
  post: store.post.post,
  isLogin: store.user.isLogin,
  isLoadingGetPost: store.post.isLoadingGetPost
});

const mapDispatchToProps = {
  getPost: Actions.GET_POST,
  deletePost: Actions.DELETE_POST
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContainer)