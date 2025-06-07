import { api } from '@/store/api';
// Slices
import { setActivacionToken, setEmail, setUserRegistration } from '@/store/slices/auth';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    checkemail: builder.mutation<any, IAuth['userInfo']>({
      query: (userInfo) => ({ url: 'auth/check', method: 'POST', body: { userInfo } }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        dispatch(setEmail({ email: '', phone: '', password: '', confirmPassword: '' }));
      },
    }),

    registerUser: builder.mutation<any, Partial<IAuth>>({
      query: (body) => ({ url: 'auth/register', method: 'POST', body }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        dispatch(
          setUserRegistration({
            accountType: args.accountType,
            companyname: args.companyname,
            firstname: args.firstname,
            lastname: args.lastname,
            username: args.username,
            birthday: args.birthday,
            date: args.date,
          })
        );

        try {
          const result = await queryFulfilled;
          dispatch(setActivacionToken({ token: result.data.activationToken }));
        } catch (error: any) {}
      },
    }),

    activate: builder.mutation<any, Partial<IAuth>>({
      query: (body) => ({ url: 'auth/register/activate', method: 'POST', body }),
    }),
  }),
});

export const { useCheckemailMutation, useRegisterUserMutation, useActivateMutation } = authApi;
