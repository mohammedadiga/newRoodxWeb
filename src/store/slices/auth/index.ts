import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Partial<IAuth> = {
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  companyname: '',
  firstname: '',
  lastname: '',
  username: '',
  birthday: undefined,
  date: undefined,
  accountType: undefined,
  maskedContact: '',
  token: '',
  message:''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<Partial<Pick<IAuth, 'email' | 'phone' | 'password' | 'confirmPassword'>>>) {
      if (action.payload.email !== undefined) {
        state.email = action.payload.email;
      }
      if (action.payload.phone !== undefined) {
        state.phone = action.payload.phone;
      }
      if (action.payload.password !== undefined) {
        state.password = action.payload.password;
      }
      if (action.payload.confirmPassword !== undefined) {
        state.confirmPassword = action.payload.confirmPassword;
      }
    },
    setUserRegistration(state, action: PayloadAction<Partial<IAuth>>) {
      state.accountType = action.payload.accountType;
      state.companyname = action.payload.companyname;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.username = action.payload.username;
      state.birthday = action.payload.birthday;
      state.date = action.payload.date;
    },
    setActivacionToken(state, action: PayloadAction<Partial<IAuth>>) {
      state.token = action.payload.token;
    },
    setForgotPassword(state, action: PayloadAction<Partial<IAuth>>) {
      state.userInfo = action.payload.userInfo;
      state.maskedContact = action.payload.maskedContact;
      state.message = action.payload.message;
    },
    setRessetPassword(state, action: PayloadAction<Partial<IAuth>>) {
      state.userId = action.payload.userId;
      state.userToken = action.payload.userToken;
    },
  },
});

export const { setEmail, setUserRegistration, setActivacionToken, setForgotPassword, setRessetPassword } = authSlice.actions;
export default authSlice.reducer;
