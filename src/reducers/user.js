import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, pseudo: null, isConnected: false, isVenue: false },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.value.token = action.payload.token;
      state.value.pseudo = action.payload.pseudo;
      state.value.isConnected = true;
      state.value.isVenue = action.payload.isVenue;
    },
    logOut: (state) => {
      state.value.token = null;
      state.value.name = null;
      state.value.isVenue = false;
      state.value.isConnected= false;
    },
  },
});

export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
