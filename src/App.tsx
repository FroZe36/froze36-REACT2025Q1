import { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import CardList from './components/CardList/CardList';
import Search from './components/Search/Search';
import { countriesApi } from './api/countriesApi';
import { ModifiedCountriesData } from './types';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState<ModifiedCountriesData[] | null>(null);
  const [filterData, setFilterData] = useState<ModifiedCountriesData[] | null>(
    null
  );
  const [uniqueRegions, setUniqueRegions] = useState<string[] | null>(null);
  const [filterRegion, setFilterRegion] = useState('');
  // const [filterByName, setFilterByName] = useState(false);
  // const [filterByPopulation, setFilterByPopulation] = useState(false);
  // const [filterByRegion, setFilterByRegion] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fetchData = async () => {
    setLoading(true);
    try {
      const countries = await countriesApi();
      if (countries) {
        setData(countries);
        setFilterData(countries);
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
      newData = newData.filter(({ name }) =>
        name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilterData(newData);
    }
  }, [searchValue, data, filterRegion]);

  useEffect(() => {
    if (data) {
      const regions = Array.from(new Set(data.map((el) => el.region)));
      setUniqueRegions(regions);
    }
  }, [data]);

  const changeSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  // const sortAndUpdateByName = () => {
  //   const data = filterData.filter();
  // };
  // const sortAndUpdateByPopulation = () => {};
  const filterAndUpdateByRegion = (region: string) => {
    if (data) {
      if (region === 'All') {
        setFilterData(data);
      } else {
        const filterData = data?.filter((data) => data.region === region);
        setFilterData(filterData);
      }
      setFilterRegion(region);
      setSearchValue('');
    }
  };
  return (
    <main>
      <Search
        value={searchValue}
        onChangeSearch={changeSearchHandler}
        filterByRegion={filterAndUpdateByRegion}
        regions={uniqueRegions}
      />
      <CardList loading={loading} error={error} filterData={filterData} />
    </main>
  );
}

export default App;
