import { FC } from 'react';
import { ModifiedCountriesData } from '../../types';
import Card from '../Card/Card';
import styles from './cardList.module.css';

const { list, titleRed } = styles;

interface CardListProps {
  loading: boolean;
  error: string | null;
  filterData: ModifiedCountriesData[] | null;
}

const CardList: FC<CardListProps> = ({ loading, error, filterData }) => {
  if (error) return error;
  if (loading) return <h1 className={titleRed}>Loading...</h1>;
  if (!loading && filterData?.length === 0) {
    return <h1 className={titleRed}>No Countries find</h1>;
  }
  return (
    <ul className={list}>
      {filterData &&
        filterData.map((card) => {
          return <Card key={card.name} {...card} />;
        })}
    </ul>
  );
};
export default CardList;
