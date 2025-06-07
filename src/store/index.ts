import { configureStore } from '@reduxjs/toolkit';
// API
import { api } from '@/store/api';
import { locationapi } from '@/store/api/location.api';
// Slices
import userReducer from './slices/user';
import locationReducer from '@/store/slices/setting/locationSlice';
import authReducer from '@/store/slices/auth';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [locationapi.reducerPath]: locationapi.reducer,
    location: locationReducer,
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, locationapi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ✅ Initialize app with essential data
const initializeApp = async () => {
  try {
    await Promise.all([store.dispatch(api.endpoints.loadUser.initiate({})).unwrap()]);
  } catch (error) {
    // console.error('App initialization failed:', error);
  }
};

initializeApp();

export default store;
