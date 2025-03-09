import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { starWarsApi } from '../api/StarWarsService';
import { setupListeners } from '@reduxjs/toolkit/query';
import starshipsReducer from './selectedStarshipsSlice';

export const store = configureStore({
  reducer: {
    selectedStarships: starshipsReducer,
    [starWarsApi.reducerPath]: starWarsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApi.middleware),
});

setupListeners(store.dispatch);

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
