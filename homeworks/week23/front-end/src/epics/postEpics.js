import { ofType } from "redux-observable";
import { catchError, map, switchMap } from "rxjs/operators";
import { ajax } from 'rxjs/ajax';
import { ActionTypes, Actions } from "../actions";
import storage from "../utlis/storage";

export const getPostsList = action$ =>
  action$.pipe(
    ofType(ActionTypes.GET_POSTS_LIST),
    switchMap(action =>       
      ajax.getJSON(`/v1/api/posts?category=${action.category}`).pipe(
        map(res => Actions.GET_POSTS_LIST_RESULT(res)),
        catchError(error => console.log(error))
      )
    )
  )

export const getPost = action$ =>
  action$.pipe(
    ofType(ActionTypes.GET_POST),
    switchMap(action => 
      ajax.getJSON(`/v1/api/posts/${action.id}`).pipe(
        map(res => Actions.GET_POST_RESULT(res)),
        catchError(error => console.log(error))
      )
    )
  )


export const createPost = action$ =>
  action$.pipe(
    ofType(ActionTypes.CREATE_POST),
    switchMap(action => 
      ajax({
        url: '/v1/api/posts',
        body: action.post,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization' : storage.getCookie('token')
        }
      }).pipe(
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
      ajax({
        url: `/v1/api/posts/${action.id}`,
        method: 'DELETE',
        headers: {
          'authorization' : storage.getCookie('token')
        }
      }).pipe(
          map(res => Actions.DELETE_POST_RESULT(null)),
          catchError(error => console.log(error))
        )
    )
  )

export const editPost = action$ =>
  action$.pipe(
    ofType(ActionTypes.EDIT_POST),
    switchMap(action => 
      ajax({
        url: `/v1/api/posts/${action.id}`,
        method: 'PATCH',
        body: action.post,
        headers: {
          'Content-Type': 'application/json',
          'authorization': storage.getCookie('token')
        }
      }).pipe(
        map(res => Actions.EDIT_POST_RESULT(null)),
        catchError(error => console.log(error))
      )
    )
  )

export const getCategories = action$ =>
  action$.pipe(
    ofType(ActionTypes.GET_CATEGORIES),
    switchMap(() =>       
      ajax.getJSON(`/v1/api/categories`).pipe(
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
      ajax.getJSON(`/v1/api/tags`).pipe(
        map(res => Actions.GET_TAGS_RESULT(
          res.map(tag => tag.DISTINCT)
        )),
        catchError(error => console.log(error))
      )
    )
  )