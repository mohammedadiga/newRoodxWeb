import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
  ip: string | null;
  country: string ;
}

const initialState: LocationState = {
  ip: null,
  country: 'US',
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation(state, action: PayloadAction<{ ip: string; country: string }>) {
      state.ip = action.payload.ip;
      state.country = action.payload.country;
    },
    clearLocation(state) {
      state.ip = null;
      state.country = 'US';
    },
  },
});

export const { setLocation, clearLocation } = locationSlice.actions;
export default locationSlice.reducer;
