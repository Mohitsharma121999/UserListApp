import {PayloadAction} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import types from '../types';
import isFirstTime from './isFirstTime';
import auth from './auth';


const appReducer = combineReducers({
  isFirstTime,
  auth,
});

const rootReducer = (state: any, action: PayloadAction) => {
  if (action.type == types.CLEAR_REDUX_STATE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
