import { api } from '@/store/api';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, Partial<IAuth>>({
      query: (userData) => ({ url: 'auth/login', method: 'POST', body: userData }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
