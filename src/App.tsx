import { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import CardList from './components/CardList/CardList';
import Search from './components/Search/Search';
import { countriesApi } from './api/countriesApi';
import { KeysOfSort, ModifiedCountriesData, TypesOfSort } from './types';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState<ModifiedCountriesData[] | null>(null);
  const [filterData, setFilterData] = useState<ModifiedCountriesData[] | null>(
    null
  );
  const [uniqueRegions, setUniqueRegions] = useState<string[] | null>(null);
  const [filterRegion, setFilterRegion] = useState('All');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<KeysOfSort | null>(null);
  const [sortType, setSortType] = useState<TypesOfSort | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const countries = await countriesApi();
      if (countries) {
        setData(countries);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      let newData = data;
      if (filterRegion !== 'All') {
        newData = newData.filter(({ region }) => region === filterRegion);
      }
      if (sortKey) {
        newData = [...newData].sort((a, b) => {
          if (sortKey === 'name') {
            return sortType === 'asc'
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          } else if (sortKey === 'population') {
            return sortType === 'asc'
              ? a.population - b.population
              : b.population - a.population;
          }
          return 0;
        });
      }
      newData = newData.filter(({ name }) =>
        name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilterData(newData);
    }
  }, [searchValue, data, filterRegion, sortKey, sortType]);

  useEffect(() => {
    if (data) {
      const regions = Array.from(new Set(data.map((el) => el.region)));
      setUniqueRegions(regions);
    }
  }, [data]);

  const changeSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const filterAndUpdateByRegion = (region: string) => {
    setFilterRegion(region);
    setSearchValue('');
  };
  const sortData = (key: KeysOfSort) => {
    setSortKey(key);
    setSortType(sortType === 'asc' ? 'desc' : 'asc');
  };

  return (
    <main>
      <Search
        value={searchValue}
        onChangeSearch={changeSearchHandler}
        filterByRegion={filterAndUpdateByRegion}
        regions={uniqueRegions}
        sort={sortData}
        sortKey={sortKey}
        sortType={sortType}
      />
      <CardList loading={loading} error={error} filterData={filterData} />
    </main>
  );
}

export default App;
