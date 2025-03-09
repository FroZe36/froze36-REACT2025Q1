import { FormEvent, memo, useCallback, useEffect } from 'react';
import ThemedButton from '../theme/ThemedButton';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/hooks/hooks';
import { setSearchParam } from '@/redux/searchParamsSlice';
import styles from './TopSection.module.scss';

const { topSection, topSection__form, topSection__input } = styles;
const TopSection = () => {
  const localStorageKeyName = 'savedInputValue';
  const [storageData, setStorageData] = useLocalStorage(localStorageKeyName);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSearchParam(storageData));
  }, []);

  const handleSearch = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const inputValue = (
        e.currentTarget.elements.namedItem('searchInput') as HTMLInputElement
      ).value.trim();
      setStorageData(inputValue);
      dispatch(setSearchParam(inputValue));
      router.push(`/starships/1`);
    },
    [dispatch, router, setStorageData]
  );
  return (
    <section className={topSection}>
      <ThemedButton />
      <form className={topSection__form} onSubmit={handleSearch}>
        <input
          type="text"
          defaultValue={storageData}
          placeholder="Type name of Starship ..."
          className={topSection__input}
          name="searchInput"
        />
        <button type="submit" className="topSection__btn">
          Search
        </button>
      </form>
    </section>
  );
};

export default memo(TopSection);
