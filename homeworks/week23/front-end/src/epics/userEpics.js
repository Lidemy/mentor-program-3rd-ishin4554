import { ofType } from "redux-observable";
import { catchError, map, switchMap } from "rxjs/operators";
import { ajax } from 'rxjs/ajax';
import { ActionTypes, Actions } from "../actions";
import storage from '../utlis/storage';

export const login = action$ =>
  action$.pipe(
    ofType(ActionTypes.LOGIN),
    switchMap(action => 
      ajax.post( 
        '/v1/api/login', 
        { username: action.username, 
          password: action.password },
        {'Content-Type': 'application/json'}).pipe(
          map(res => {
            if(res.response.message !== 'success') {
              alert(res.response.message)
              return Actions.GET_LOGIN_RESULT(null, res.response.message);
            } else {
              storage.addCookie(res.response.token);
              return Actions.GET_LOGIN_RESULT(res.response.token, null);
            }
          }),
          catchError(error => console.log(error))
        )
    )
  )

export const register = action$ =>
  action$.pipe(
    ofType(ActionTypes.REGISTER),
    switchMap(action => 
      ajax.post( 
        '/v1/api/users', 
        { username: action.username, 
          password: action.password, 
          nickname: action.nickname },
        {'Content-Type': 'application/json'}).pipe(
          map(res => Actions.GET_REGISTER_RESULT(null)),
          catchError(error => Actions.GET_REGISTER_RESULT(error))
        )
    )
  )

export const logout = action$ =>
  action$.pipe(
    ofType(ActionTypes.LOGOUT),
    map(res => {
        storage.removeCookie();
        return Actions.GET_LOGOUT_RESULT(null);
      }),
      catchError(error => Actions.GET_LOGOUT_RESULT(error))
    )
  