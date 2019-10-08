import { combineEpics } from 'redux-observable';
import { keysIn } from 'lodash';
import * as userEpics from './userEpics';
import * as postEpics from './postEpics';

const combineEpicFunctions = epics => {
  return epics.reduce((arr, epic) => {
    return arr.concat(keysIn(epic).map(key => epic[key]));
  }, []);
};

const epics = combineEpicFunctions([
  userEpics,
  postEpics,
]);

export const rootEpic = combineEpics(...epics);
