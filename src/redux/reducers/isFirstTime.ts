import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import types from '../types';

export interface isFirstTimeState {
  isFirstTime: boolean;
}
const initialState: isFirstTimeState = {
  isFirstTime: false,
};

export const isFirstTimeSlice = createSlice({
  name: types.IS_FIRST_TIME,
  initialState,
  reducers: {
    changeIsFirstTime: (state, action: PayloadAction<boolean>) => {
      const data = action.payload;
      state.isFirstTime = data;
      return state;
    },
  },
});

export const {changeIsFirstTime} = isFirstTimeSlice.actions;

export default isFirstTimeSlice.reducer;
