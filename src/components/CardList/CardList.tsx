import { FC, memo } from 'react';
import { ModifiedCountriesData } from '../../types';
import Card from '../Card/Card';
import styles from './cardList.module.css';
import useLocalStorage from '../../useLocalStorage';

const { list, titleRed } = styles;

interface CardListProps {
  loading: boolean;
  error: string | null;
  filterData: ModifiedCountriesData[] | null;
}

const CardList: FC<CardListProps> = ({ loading, error, filterData }) => {
  const STORAGE_KEY = 'selected-cards';
  const [storageData, setStorageData] = useLocalStorage(STORAGE_KEY);
  if (error) return error;
  if (loading) return <h1 className={titleRed}>Loading...</h1>;
  if (!loading && filterData?.length === 0) {
    return <h1 className={titleRed}>No Countries find</h1>;
  }
  return (
    <ul className={list}>
      {filterData &&
        filterData.map((card) => {
          return (
            <Card
              key={card.name}
              {...card}
              storageData={storageData}
              setStorageData={setStorageData}
            />
          );
        })}
    </ul>
  );
};
export default memo(CardList);
