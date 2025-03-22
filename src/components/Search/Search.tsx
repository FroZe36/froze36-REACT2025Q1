import { ChangeEvent, FC } from 'react';
import styles from './search.module.css';

const { container, container_block } = styles;
interface SearchProps {
  value: string;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  regions: string[] | null;
  filterByRegion: (region: string) => void;
}

const Search: FC<SearchProps> = ({
  value,
  onChangeSearch,
  regions,
  filterByRegion,
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
        <button type="button">Sort by Name</button>
        <button type="button">Sort by Population</button>
      </div>
    </div>
  );
};
export default Search;
