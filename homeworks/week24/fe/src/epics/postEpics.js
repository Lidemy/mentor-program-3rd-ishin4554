import { ofType } from "redux-observable";
import { from } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { ajax, fromFetch } from 'rxjs/ajax';
import { ActionTypes, Actions } from "../actions";
import * as api from "../utlis/api";

export const getPostsList = action$ =>
  action$.pipe(
    ofType(ActionTypes.GET_POSTS_LIST),
    switchMap(action =>        
      from(api.getPosts(action.category)).pipe(
        map(res => Actions.GET_POSTS_LIST_RESULT(res)),
        catchError(error => console.log(error))
      )
    )
  )

export const getPost = action$ =>
  action$.pipe(
    ofType(ActionTypes.GET_POST),
    switchMap(action => 
      from(api.getPost(action.id)).pipe(
        map(res => Actions.GET_POST_RESULT(res)),
        catchError(error => console.log(error))
      )
    )
  )


export const createPost = action$ =>
  action$.pipe(
    ofType(ActionTypes.CREATE_POST),
    switchMap(action => 
      from(api.createPost(action.post)).pipe(
          map(res => {
            return Actions.CREATE_POST_RESULT(null)
          }),
          catchError(error => console.log(error))
        )
    )
  )

export const deletePost = action$ =>
  action$.pipe(
    ofType(ActionTypes.DELETE_POST),
    switchMap(action => 
      from(api.deletePost(action.id)).pipe(
          map(res => Actions.DELETE_POST_RESULT(null)),
          catchError(error => console.log(error))
        )
    )
  )

export const editPost = action$ =>
  action$.pipe(
    ofType(ActionTypes.EDIT_POST),
    switchMap(action => 
      from(api.editPost(action.id, action.post)).pipe(
        map(res => Actions.EDIT_POST_RESULT(null)),
        catchError(error => console.log(error))
      )
    )
  )

export const getCategories = action$ =>
  action$.pipe(
    ofType(ActionTypes.GET_CATEGORIES),
    switchMap(() =>       
    from(api.getCategories()).pipe(
        map(res => Actions.GET_CATEGORIES_RESULT(
            res.map(category => category.DISTINCT)
          )),
        catchError(error => console.log(error))
      )
    )
  )

export const getTags = action$ =>
  action$.pipe(
    ofType(ActionTypes.GET_TAGS),
    switchMap(() =>       
      from(api.getTags()).pipe(
        map(res => Actions.GET_TAGS_RESULT(
          res.map(tag => tag.DISTINCT)
        )),
        catchError(error => console.log(error))
      )
    )
  )