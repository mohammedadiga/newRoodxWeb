import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setLocation } from '@/store/slices/setting/locationSlice';

export const locationapi = createApi({
  reducerPath: 'locationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_LOCATION_API_URL,
  }),
  endpoints: (builder) => ({
    getIp: builder.query<any, void>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setLocation({ ip: data.ip, country: data.country }));
        } catch (error) {
          console.error('Load Location failed:', error);
        }
      },
    }),
  }),
});

export const { useGetIpQuery } = locationapi;
