import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUsers: (state, action) => {
      state.users = [...state.users, ...action.payload];
    },
    clearUsers: (state) => {
      state.users = [];
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
});

export const { setLoading, setUsers, clearUsers, setError } = userSlice.actions;
export default userSlice.reducer;