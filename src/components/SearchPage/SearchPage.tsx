import { ChangeEvent, useState } from 'react';
import TopSection from '../TopSection/TopSection';
import BottomSection from '../BottomSection/BottomSection';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import useLocalStorage from '../../hooks/useLocalStorage';
import './SearchPage.scss';
import { useNavigate } from 'react-router';

const SearchPage = () => {
  const localStorageKeyName = 'savedInputValue';
  const [storageData, setStorageData] = useLocalStorage(localStorageKeyName);
  const [inputValue, setInputValue] = useState<string>(storageData);
  const navigate = useNavigate();
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
        <BottomSection storageData={storageData} />
      </main>
    </ErrorBoundary>
  );
};

export default SearchPage;
