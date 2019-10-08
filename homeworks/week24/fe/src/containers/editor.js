import React from "react";
import { connect } from "react-redux";
import { Actions } from "../actions";
import Editor from "../components/editor";

const EditorContainer = props => <Editor {...props} />;

const mapStateToProps = store => ({
  post: store.post.post,
  categories: store.post.categories,
  tags: store.post.tags,
  isLoadingGetPost: store.post.isLoadingGetPost,
  isLoadingCreatePost: store.post.isLoadingCreateArticle,
  isLoadingEditPost: store.post.isLoadingCreatePost,
});

const mapDispatchToProps = {
  createPost: Actions.CREATE_POST,
  editPost: Actions.EDIT_POST,
  getCategories: Actions.GET_CATEGORIES,
  getTags: Actions.GET_TAGS,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer)