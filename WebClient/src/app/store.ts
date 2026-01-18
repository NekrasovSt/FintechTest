import { configureStore } from '@reduxjs/toolkit';
import codesReducer from '../features/codes-slice.ts';

export const store = configureStore({
  reducer: {
    codes: codesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;