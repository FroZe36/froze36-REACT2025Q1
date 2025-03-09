import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { starWarsApi } from '../api/StarWarsService';
import { setupListeners } from '@reduxjs/toolkit/query';
import starshipsReducer from './selectedStarshipsSlice';
import searchReducer from './searchParamsSlice';
import { createWrapper } from 'next-redux-wrapper';

const makeStore = () =>
  configureStore({
    reducer: {
      selectedStarships: starshipsReducer,
      searchParams: searchReducer,
      [starWarsApi.reducerPath]: starWarsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(starWarsApi.middleware),
  });

export const wrapper = createWrapper(makeStore, { debug: true });

setupListeners(makeStore().dispatch);

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
