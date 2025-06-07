import { api } from '@/store/api';
// Slices
import { setActivacionToken, setForgotPassword, setRessetPassword } from '@/store/slices/auth';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    forgotPassword: builder.mutation<any, Partial<IAuth>>({
      query: (userInfo) => ({ url: 'auth/password/forgot', method: 'POST', body: userInfo }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setActivacionToken({ token: result.data.activationToken }));
          dispatch(setForgotPassword({ userInfo: args.userInfo, maskedContact: result.data.maskedContact, message: result.data.message }));
        } catch (error: any) {}
      },
    }),
    activatePassword: builder.mutation<any, Partial<IAuth>>({
      query: (body) => ({ url: 'auth/password/active', method: 'POST', body }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setRessetPassword({ userToken: result.data.token, userId: result.data.userId }));
        } catch (error: any) {}
      },
    }),
    resetPassword: builder.mutation<any, Partial<IAuth>>({
      query: (body) => ({ url: 'auth/password/reset', method: 'PUT', body }),
    }),
  }),
});

export const { useForgotPasswordMutation, useActivatePasswordMutation, useResetPasswordMutation } = authApi;
