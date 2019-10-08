import { ActionTypes } from "../actions";
import storage from "../utlis/storage";

const token = storage.getCookie('token');

const defaultState = {
  isLogin: token ? true : false,
  isLodingLogin: false,
  isLoadingLogout: false,
  errorMessage: null,
  token: storage.getCookie('token')
};

function userReducer(state = defaultState, action) {
  switch(action.type){
    case ActionTypes.LOGIN:
      return {
        ...state,
        isLodingLogin: true,
      }
    
    case ActionTypes.GET_LOGIN_RESULT: 
      return {
        ...state,
        isLogin: action.token ? true : false,
        isLodingLogin: false,
        token: action.token,
        errorMessage: action.error
      }
    case ActionTypes.LOGOUT: 
      return {
        ...state,
        isLoadingLogout: true,
      }

    case ActionTypes.GET_LOGOUT_RESULT: 
      return {
        ...state,
        isLoadingLogout: false,
        isLogin: false,
        token: '',
        errorMessage: action.error
      }

    default: 
      return state;
  }
}

export { userReducer, defaultState };