import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import countryReducer from './countrySlice';

export const store = configureStore({
  reducer: {
    countries: countryReducer,
  },
});

setupListeners(store.dispatch);

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
