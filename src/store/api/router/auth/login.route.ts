import { api } from '@/store/api';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, Partial<IAuth>>({
      query: (userData) => ({ url: 'auth/login', method: 'POST', body: userData }),
    }),
    logout: builder.mutation<any, void>({
      query: () => ({ url: 'auth/logout', method: 'DELETE' }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
