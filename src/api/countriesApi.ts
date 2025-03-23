import { CountriesData, ModifiedCountriesData } from '../types';

const BASE_URL = 'https://restcountries.com/v3.1/all';
export const countriesApi = async (): Promise<ModifiedCountriesData[]> => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(
        `Could not fetch ${BASE_URL}, status: ${response.status}`
      );
    }
    const data = (await response.json()) as CountriesData[];
    return data.map((item) => {
      const {
        name: { common },
        region,
        population,
        flags: { png, svg, alt },
      } = item;
      return {
        name: common,
        region,
        population,
        flags: { png, svg, alt },
      };
    });
  } catch (error) {
    console.error('Error at Countries Api:', error);
    throw error;
  }
};
