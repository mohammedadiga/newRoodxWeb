// features/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface user extends Partial<IUser> {
  user: IUser | null;
}

const initialState: Partial<user> = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<user>) {
      state.user = action.payload.user;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
