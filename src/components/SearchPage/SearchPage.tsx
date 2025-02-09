import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import TopSection from '../TopSection/TopSection';
import {
  StarshipShortProperties,
  getStarships,
} from '../../api/StarWarsService';
import BottomSection from '../BottomSection/BottomSection';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import useLocalStorage from '../../hooks/useLocalStorage';
import './SearchPage.scss';

interface SearchPageState {
  inputValue: string;
  data: StarshipShortProperties[] | [];
  loading: boolean;
  error: null | string;
}

const SearchPage = () => {
  const localStorageKeyName = 'savedInputValue';

  const [inputValue, setInputValue] =
    useState<SearchPageState['inputValue']>('');
  const [data, setData] = useState<SearchPageState['data']>([]);
  const [loading, setLoading] = useState<SearchPageState['loading']>(false);
  const [error, setError] = useState<SearchPageState['error']>(null);
  const [storageData, setStorageData] = useLocalStorage(localStorageKeyName);

  const initializeState = useCallback((storageData: string) => {
    setInputValue(storageData);
    fetchData(storageData);
  }, []);

  useEffect(() => {
    initializeState(storageData);
  }, [storageData, initializeState]);

  async function fetchData(searchQuery: string) {
    setLoading((prevState) => !prevState);
    try {
      const data = await getStarships(searchQuery);
      if (data) {
        setData(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        setData([]);
        setError(error.message);
      }
    } finally {
      setLoading((prevState) => !prevState);
    }
  }

  function handleSearch() {
    setStorageData(inputValue);
  }
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value.trim());
  }
  return (
    <ErrorBoundary>
      <main className="main">
        <TopSection
          handlerChange={handleChange}
          handlerSearch={handleSearch}
          inputValue={inputValue}
        />
        <BottomSection loadingState={loading} data={data} error={error} />
      </main>
    </ErrorBoundary>
  );
};

export default SearchPage;
