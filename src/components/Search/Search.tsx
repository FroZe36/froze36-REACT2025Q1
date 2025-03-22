import { ChangeEvent, FC } from 'react';
import styles from './search.module.css';
import { KeysOfSort, TypesOfSort } from '../../types';

const {
  container,
  container_block,
  container_button,
  triangle,
  triangle_desceding,
} = styles;
interface SearchProps {
  value: string;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  regions: string[] | null;
  filterByRegion: (region: string) => void;
  sort: (key: KeysOfSort) => void;
  sortKey: KeysOfSort | null;
  sortType: TypesOfSort | null;
}

const Search: FC<SearchProps> = ({
  value,
  onChangeSearch,
  regions,
  filterByRegion,
  sort,
  sortKey,
  sortType,
}) => {
  const handleChangeByRegion = (e: ChangeEvent<HTMLSelectElement>) => {
    filterByRegion(e.target.value);
  };
  return (
    <div className={container}>
      <label className={container_block}>
        <h2>Search Countries:</h2>
        <input
          type="text"
          name="search"
          id="search"
          value={value}
          onChange={onChangeSearch}
        />
      </label>

      <div className={container_block}>
        <select
          name="selectRegion"
          id="selectRegion"
          defaultValue="All"
          onChange={handleChangeByRegion}
        >
          <option value="All">All countries</option>
          {regions &&
            regions.map((region) => (
              <option value={region} key={region}>
                {region}
              </option>
            ))}
        </select>
        <button
          type="button"
          className={container_button}
          onClick={() => sort('name')}
        >
          Sort by Name
          {sortKey === 'name' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              className={`${triangle} ${sortType === 'asc' ? null : triangle_desceding}`}
            >
              <path
                fill="#daf759"
                d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
              />
            </svg>
          ) : null}
        </button>
        <button
          type="button"
          className={container_button}
          onClick={() => sort('population')}
        >
          Sort by Population
          {sortKey === 'population' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              className={`${triangle} ${sortType === 'asc' ? null : triangle_desceding}`}
            >
              <path
                fill="#daf759"
                d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
              />
            </svg>
          ) : null}
        </button>
      </div>
    </div>
  );
};
export default Search;
