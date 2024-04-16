import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, pseudo: null, isConnected: false },
};

export const venueSlice = createSlice({
  name: 'venue',
  initialState,
  reducers: {
    venueLogIn: (state, action) => {
      state.value.token = action.payload.token;
      state.value.pseudo = action.payload.pseudo;
      state.value.isConnected = true;

    },
    venueLogOut: (state) => {
      state.value.token = null;
      state.value.pseudo = null;
      state.value.isConnected = false;

    },
  },
});

export const { venueLogIn, venueLogOut } = venueSlice.actions;
export default venueSlice.reducer;
