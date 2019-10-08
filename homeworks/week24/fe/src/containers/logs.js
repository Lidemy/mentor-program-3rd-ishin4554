import React from "react";
import { connect } from "react-redux";
import { Actions } from "../actions";
import Logs from "../components/logs";

const LogsContainer = props => <Logs {...props} />;


const mapStateToProps = store => ({
  postsList: store.post.postsList,
  post: store.post.post,
  isLoadingGetPostsList: store.post.isLoadingGetPostsList,
  isLoadingGetPost: store.post.isLoadingGetPost,
});

const mapDispatchToProps = {
  getPostsList: Actions.GET_POSTS_LIST,
  getPost: Actions.GET_POST,
}

export default connect(mapStateToProps, mapDispatchToProps)(LogsContainer)