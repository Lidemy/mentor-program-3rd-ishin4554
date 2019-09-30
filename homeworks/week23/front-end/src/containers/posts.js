import React from "react";
import { connect } from "react-redux";
import { Actions } from "../actions";
import Posts from "../components/posts/";

const PostsContainer = props => <Posts {...props} />;

const mapStateToProps = store => ({
  postsList: store.post.postsList,
  isLoadingGetPostsList: store.post.isLoadingGetPostsList,
  isLoadingCreatePost: store.post.isLoadingCreatePost,
  isLoadingDeletePost: store.post.isLoadingDeletePost,
  isLoadingEditPost: store.post.isLoadingEditPost
});

const mapDispatchToProps = {
  getPostsList: Actions.GET_POSTS_LIST,
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer)