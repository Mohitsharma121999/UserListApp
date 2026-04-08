import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import types from '../types';

export interface authState {
  userData?: any;
  internetConnection?: boolean;
}
const initialState: authState = {
  userData: {},
  internetConnection: false,
};

export const authSlice = createSlice({
  name: types.LOGIN,
  initialState,
  reducers: {
    changeAuth: (state, action: PayloadAction) => {
      const data: any = action.payload;
      state.userData = data;
     
    },
  },
});

export const {changeAuth} = authSlice.actions;

export default authSlice.reducer;
