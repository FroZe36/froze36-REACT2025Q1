export interface CountriesData {
  name: {
    common: string;
  };
  region: string;
  population: number;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
}
export type ModifiedCountriesData = Omit<CountriesData, 'name'> & {
  name: string;
};
export type KeysOfSort = 'name' | 'population';
export type TypesOfSort = 'asc' | 'desc';
