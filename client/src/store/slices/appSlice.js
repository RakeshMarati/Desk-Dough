import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  theme: 'light',
  user: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setLoading, setTheme, setUser } = appSlice.actions;
export default appSlice.reducer;

