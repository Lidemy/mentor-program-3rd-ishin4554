import EasyActions from 'redux-easy-actions';

const { Actions, Constants } = EasyActions({
  // Users
  LOGIN(type, username, password) {
    return { type, username, password };
  },

  GET_LOGIN_RESULT(type, token, error) {
    return { type, token, error };
  },

  REGISTER(type, username, password, nickname) {
    return { type, username, password, nickname };
  },

  GET_REGISTER_RESULT(type, error) {
    return { type, error };
  },

  LOGOUT(type) {
    return { type };
  },

  GET_LOGOUT_RESULT(type, error) {
    return { type, error };
  },
  
  // Posts
  GET_POSTS_LIST(type, category) {
    return { type, category };
  },

  GET_POSTS_LIST_RESULT(type, list) {
    return { type, list };
  },

  GET_POST(type, id) {
    return { type, id };
  },

  GET_POST_RESULT(type, post) {
    return { type, post }; 
  },

  CREATE_POST(type, post) {
    return { type, post };
  },

  CREATE_POST_RESULT(type, err) {
    return { type, err };
  },

  DELETE_POST(type, id) {
    return { type, id };
  },

  DELETE_POST_RESULT(type, error) {
    return { type, error };
  },

  EDIT_POST(type, id, post) {
    return { type, id, post };
  },

  EDIT_POST_RESULT(type, error) {
    return { type, error };
  },

  GET_CATEGORIES(type) {
    return { type };
  },

  GET_CATEGORIES_RESULT(type, list) {
    return { type, list };
  },

  GET_TAGS(type) {
    return { type };
  },

  GET_TAGS_RESULT(type, list) {
    return { type, list }
  }
})

export { Actions, Constants as ActionTypes };