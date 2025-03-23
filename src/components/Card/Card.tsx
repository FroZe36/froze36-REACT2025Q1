import { FC, memo, useCallback, useMemo } from 'react';
import { ModifiedCountriesData } from '../../types';
import styles from './card.module.css';

const { card, card__imgContainer } = styles;

const Card: FC<
  ModifiedCountriesData & {
    storageData: string[];
    setStorageData: (item: string) => void;
  }
> = ({ name, region, population, flags, storageData, setStorageData }) => {
  const handleClick = useCallback(() => {
    setStorageData(name);
  }, [name, setStorageData]);

  const borderColor = useMemo(
    () => `${storageData.includes(name) ? 'yellow' : null}`,
    [storageData, name]
  );

  return (
    <li
      className={card}
      style={{ borderColor: borderColor }}
      onClick={handleClick}
    >
      <h3>Name: {name}</h3>
      <h4>Region: {region}</h4>
      <h4>Population: {population}</h4>
      <div className={card__imgContainer}>
        <img src={flags.png} alt={`${flags.alt ? flags.alt : ''}`} />
      </div>
    </li>
  );
};
export default memo(Card);
