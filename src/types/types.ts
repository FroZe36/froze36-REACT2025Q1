export type RouteParams = {
  starshipId?: string;
  pageId: string;
  search: string | null;
};
export interface StarshipProperties {
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
export interface StarshipData<T = StarshipProperties> {
  count: number;
  next: null | string;
  previous: null | string;
  results: T[];
}
