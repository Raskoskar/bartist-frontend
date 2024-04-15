import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, name: null },
};

export const venueSlice = createSlice({
  name: 'venue',
  initialState,
  reducers: {
    venueLogIn: (state, action) => {
      state.value.token = action.payload.token;
      state.value.name = action.payload.name;
    },
    venueLogOut: (state) => {
      state.value.token = null;
      state.value.name = null;
    },
  },
});

export const { venueLogIn, venueLogOut } = venueSlice.actions;
export default venueSlice.reducer;
