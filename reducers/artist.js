import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, name: null },
};

export const artistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {
    artistLogIn: (state, action) => {
      state.value.token = action.payload.token;
      state.value.name = action.payload.name;
    },
    artistLogOut: (state) => {
      state.value.token = null;
      state.value.name = null;
    },
  },
});

export const { artistLogIn, artistLogOut } = artistSlice.actions;
export default artistSlice.reducer;
