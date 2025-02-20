import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface StarshipProperties {
  name: string;
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  films: string[];
  pilots: string[];
  url: string;
  created: string;
  edited: string;
}
export type StarshipShortProperties = Pick<
  StarshipProperties,
  'name' | 'model' | 'manufacturer' | 'length' | 'consumables'
>;

export interface StarshipData {
  count: number;
  next: null | string;
  previous: null | string;
  results: StarshipShortProperties[];
}

const BASE_URL = 'https://swapi.dev/api/';
const METHOD = 'GET';
const HEADERS = { 'Content-type': 'application/json' };

export const getStarships = async (
  searchParam: string | null = '',
  pageNum: number
) => {
  let url;
  if (searchParam && pageNum) {
    url = `${BASE_URL}?search=${searchParam}&page=${pageNum}`;
  } else if (searchParam) {
    url = `${BASE_URL}?search=${searchParam}`;
  } else if (pageNum) {
    url = `${BASE_URL}?page=${pageNum}`;
  } else {
    url = BASE_URL;
  }
  try {
    const response = await fetch(url, {
      method: METHOD,
      headers: HEADERS,
    });
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

    const data = (await response.json()) as StarshipData;
    return data;
  } catch (error) {
    console.error('Error at getStarships:', error);
    throw error;
  }
};
export const getStarship = async (name: string) => {
  const url = `${BASE_URL}?search=${name}`;
  try {
    const response = await fetch(url, {
      method: METHOD,
      headers: HEADERS,
    });
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }
    const data = (await response.json()) as StarshipData;
    return data;
  } catch (error) {
    console.error('Error at getStarship:', error);
    throw error;
  }
};

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
