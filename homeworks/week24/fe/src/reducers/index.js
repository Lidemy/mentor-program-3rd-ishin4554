import { combineReducers } from "redux";
import { userReducer as user } from "./user";
import { postReducer as post } from "./post";

const reducer = combineReducers({
  user,
  post,
});

export default reducer;
