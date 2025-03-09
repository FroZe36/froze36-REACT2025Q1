import { ChangeEvent, useCallback, useState } from 'react';
import TopSection from '../TopSection/TopSection';
import BottomSection from '../BottomSection/BottomSection';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import useLocalStorage from '../../hooks/useLocalStorage';
import './SearchPage.scss';
import { useNavigate } from 'react-router';
import Flyout from '../Flyout/Flyout';
import { useAppSelector } from '../../hooks/hooks';
import { selectTotalStarships } from '../../redux/selectedStarshipsSlice';

const SearchPage = () => {
  const localStorageKeyName = 'savedInputValue';
  const [storageData, setStorageData] = useLocalStorage(localStorageKeyName);
  const [inputValue, setInputValue] = useState<string>(storageData);
  const selectedStarshipsLength = useAppSelector((state) =>
    selectTotalStarships(state)
  );
  const navigate = useNavigate();
  const handleSearch = useCallback(() => {
    setStorageData(inputValue);
    navigate(`/`);
  }, [setStorageData, navigate, inputValue]);
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim());
  }, []);
  return (
    <ErrorBoundary>
      <main className="main">
        <TopSection
          handlerChange={handleChange}
          handlerSearch={handleSearch}
          inputValue={inputValue}
        />
        <BottomSection storageData={storageData} />
        {selectedStarshipsLength ? <Flyout /> : null}
      </main>
    </ErrorBoundary>
  );
};

export default SearchPage;
