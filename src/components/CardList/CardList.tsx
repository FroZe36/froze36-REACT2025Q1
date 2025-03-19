import { useEffect, useState } from 'react';
import { countriesApi } from '../../api/countriesApi';
import { ModifiedCountriesData } from '../../types';
import Card from '../Card/Card';
import styles from './cardList.module.css';

const { list } = styles;

const CardList = () => {
  const [data, setData] = useState<ModifiedCountriesData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
  if (error) return error;
  if (loading) return <h2>Loading</h2>;
  return (
    <ul className={list}>
      {data &&
        data.map((card) => {
          return <Card key={card.name} {...card} />;
        })}
    </ul>
  );
};
export default CardList;
