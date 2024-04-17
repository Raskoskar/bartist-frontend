import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, pseudo: null, isConnected: false, },
};

export const artistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {
    artistLogIn: (state, action) => {
      state.value.token = action.payload.token;
      state.value.pseudo = action.payload.pseudo;
      state.value.isConnected = true;
    },
    artistLogOut: (state) => {
      state.value.token = null;
      state.value.name = null;
      state.value.isConnected= false;
    },
  },
});

export const { artistLogIn, artistLogOut } = artistSlice.actions;
export default artistSlice.reducer;
