import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import TopSection from '../TopSection/TopSection';
import { StarshipData, getStarships } from '../../api/StarWarsService';
import BottomSection from '../BottomSection/BottomSection';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import useLocalStorage from '../../hooks/useLocalStorage';
import './SearchPage.scss';
import { useNavigate, useParams } from 'react-router';
import { RouteParams } from '../../types/types';

interface SearchPageState {
  inputValue: string;
  data: StarshipData | null;
  loading: boolean;
  error: null | string;
}

const SearchPage = () => {
  const localStorageKeyName = 'savedInputValue';

  const [inputValue, setInputValue] =
    useState<SearchPageState['inputValue']>('');
  const [data, setData] = useState<SearchPageState['data']>(null);
  const [loading, setLoading] = useState<SearchPageState['loading']>(false);
  const [error, setError] = useState<SearchPageState['error']>(null);
  const [storageData, setStorageData] = useLocalStorage(localStorageKeyName);
  const { pageId } = useParams<RouteParams>();
  const navigate = useNavigate();
  const initializeState = useCallback(
    (storageData: string, pageNum: number) => {
      setInputValue(storageData);
      fetchData(storageData, pageNum);
    },
    []
  );

  useEffect(() => {
    initializeState(storageData, Number(pageId));
  }, [storageData, initializeState, pageId]);

  async function fetchData(searchQuery: string, pageNum: number) {
    setLoading((prevState) => !prevState);
    try {
      const data = await getStarships(searchQuery, pageNum <= 0 ? 1 : pageNum);
      if (data) {
        setData(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        setData(null);
        setError(error.message);
      }
    } finally {
      setLoading((prevState) => !prevState);
    }
  }

  function handleSearch() {
    setStorageData(inputValue);
    navigate(`/`);
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
