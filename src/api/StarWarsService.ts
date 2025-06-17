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

const BASE_URL = 'https://swapi.dev/api/starships/';
const METHOD = 'GET';
const HEADERS = { 'Content-type': 'application/json' };

export const getStarships = async (searchParam: string | null = '') => {
  const url = searchParam ? `${BASE_URL}?search=${searchParam}` : BASE_URL;

  try {
    const response = await fetch(url, {
      method: METHOD,
      headers: HEADERS,
    });
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

    const data = (await response.json()) as StarshipData;
    return data.results;
  } catch (error) {
    console.error('Error at starWarsServiceCatch:', error);
    throw error;
  }
};
