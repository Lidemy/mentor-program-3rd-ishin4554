import { ActionTypes } from "../actions";

const defaultState = {
  postsList: [],
  categories: [],
  tags: [],
  post: {},
  isLoadingGetPost: false,
  isLoadingCreatePost: false,
  isLoadingDeletePost: false,
  isLoadingGetCategories: false,
  isLoadingGetTags: false,
  isLoadingGetPostsList: false,
  isLoadingEditPost: false,
  getPostsListError: null,
};

function postReducer(state = defaultState, action) {
  switch(action.type){
    case ActionTypes.GET_POSTS_LIST:
      return {
        ...state,
        isLoadingGetPostsList: true
      }
    
    case ActionTypes.GET_POSTS_LIST_RESULT:
      return {
        ...state,
        isLoadingGetPostsList: false,
        postsList: action.list
      }

    case ActionTypes.GET_POST: 
      return {
        ...state,
        isLoadingGetPost: true
      }

    case ActionTypes.GET_POST_RESULT: 
      return {
        ...state,
        isLoadingGetPost: false,
        post: {
          ...action.post,
          tags: action.post.Tags.map(tag => tag.name)
        }
      }
    
    case ActionTypes.CREATE_POST:
      return {
        ...state,
        isLoadingCreatePost: true
      }

    case ActionTypes.CREATE_POST_RESULT:
        return {
          ...state,
          isLoadingCreatePost: false,
        };
    
    case ActionTypes.DELETE_POST: 
      return {
        ...state,
        isLoadingDeletePost: true,
      }

    case ActionTypes.DELETE_POST_RESULT: 
      return {
        ...state,
        isLoadingDeletePost: false,
      }

    case ActionTypes.EDIT_POST: 
      return {
        ...state,
        isLoadingEditPost: true,
      }

    case ActionTypes.EDIT_POST_RESULT: 
      return {
        ...state,
        isLoadingEditPost: false,
      }

    case ActionTypes.GET_CATEGORIES:
      return {
        ...state,
        isLoadingGetCategories: true
      }

    case ActionTypes.GET_CATEGORIES_RESULT:
      return {
        ...state,
        isLoadingGetCategories: false,
        categories: action.list
      }

    case ActionTypes.GET_TAGS:
      return {
        ...state,
        isLoadingGetTags: true
      }

    case ActionTypes.GET_TAGS_RESULT:
      return {
        ...state,
        isLoadingGetTags: false,
        tags: action.list
      }

    default: 
      return state;
  }
}

export { postReducer, defaultState };