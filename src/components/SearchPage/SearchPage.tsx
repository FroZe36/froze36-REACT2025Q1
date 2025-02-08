import { ChangeEvent, useEffect, useState } from 'react';
import TopSection from '../TopSection/TopSection';
import {
  StarshipShortProperties,
  getStarships,
} from '../../api/StarWarsService';
import BottomSection from '../BottomSection/BottomSection';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

interface SearchPageState {
  inputValue: string;
  data: StarshipShortProperties[] | [];
  loading: boolean;
  error: null | string;
}

const localStorageKeyName = 'savedInputValue';

const SearchPage = () => {
  const [inputValue, setInputValue] =
    useState<SearchPageState['inputValue']>('');
  const [data, setData] = useState<SearchPageState['data']>([]);
  const [loading, setLoading] = useState<SearchPageState['loading']>(false);
  const [error, setError] = useState<SearchPageState['error']>(null);

  useEffect(() => {
    const storageData = localStorage.getItem(localStorageKeyName) ?? '';
    setInputValue(storageData);
    setStateResponse(storageData);
  }, []);

  async function setStateResponse(searchQuery: string) {
    setLoading(true);
    try {
      const data = await getStarships(searchQuery);
      if (data) {
        setData(data);
        setLoading(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        setData([]);
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch() {
    localStorage.setItem(localStorageKeyName, inputValue);
    await setStateResponse(inputValue);
  }
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value.trim());
  }
  return (
    <ErrorBoundary>
      <main>
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
