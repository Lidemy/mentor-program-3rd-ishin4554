import expect from 'expect'
import { Actions, ActionTypes } from './actions';

describe('actions', () => {
  it('get post list', () => {
    const category = 'test category'
    const expectedAction = {
      type: ActionTypes.GET_POSTS_LIST,
      category
    }
    expect(Actions.GET_POSTS_LIST(category)).toEqual(expectedAction)
  })
})
