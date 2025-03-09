import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StarshipData, StarshipShortProperties } from '../types/types';
import { HYDRATE } from 'next-redux-wrapper';
import { Action, PayloadAction } from '@reduxjs/toolkit/react';
import { RootState } from '@/redux/store';

const BASE_URL = 'https://swapi.dev/api/';

function transformData(
  data: StarshipData
): StarshipData<StarshipShortProperties> {
  return {
    ...data,
    results: data.results.map((starship) => ({
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      consumables: starship.consumables,
      length: starship.length,
    })),
  };
}

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}
export const starWarsApi = createApi({
  reducerPath: 'starWarsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  // according to documentation return value has to be any
  // https://redux-toolkit.js.org/rtk-query/usage/server-side-rendering#server-side-rendering-with-nextjs
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['Starship'],
  endpoints: (builder) => ({
    getStarships: builder.query<
      StarshipData<StarshipShortProperties>,
      { searchParam: string | null; pageNum: number }
    >({
      query: ({ searchParam = '', pageNum }) => {
        let url;
        if (searchParam && pageNum) {
          url = `starships/?search=${searchParam}&page=${pageNum}`;
        } else if (searchParam) {
          url = `starships/?search=${searchParam}`;
        } else {
          url = `starships/?page=${pageNum}`;
        }
        return url;
      },
      transformResponse: (response: StarshipData) => transformData(response),
    }),
    getStarship: builder.query<
      StarshipData<StarshipShortProperties> | null,
      { name: string }
    >({
      query: ({ name }) => `starships/?search=${name}`,
      transformResponse: (response: StarshipData) => transformData(response),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetStarshipsQuery,
  useGetStarshipQuery,
  util: { getRunningQueriesThunk },
} = starWarsApi;

export const { getStarships, getStarship } = starWarsApi.endpoints;
