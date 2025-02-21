import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StarshipData } from '../types/types';

const BASE_URL = 'https://swapi.dev/api/';
export const starWarsApi = createApi({
  reducerPath: 'starWarsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Starship'],
  endpoints: (builder) => ({
    getStarships: builder.query<
      StarshipData,
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
    }),
    getStarship: builder.query<StarshipData | null, { name: string }>({
      query: ({ name }) => `starships/?search=${name}`,
    }),
  }),
});

export const { useGetStarshipsQuery, useGetStarshipQuery } = starWarsApi;
