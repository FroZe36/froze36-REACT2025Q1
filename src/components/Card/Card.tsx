import { FC } from 'react';
import { ModifiedCountriesData } from '../../types';
import styles from './card.module.css';

const { card, card__imgContainer } = styles;

const Card: FC<ModifiedCountriesData> = ({
  name,
  region,
  population,
  flags,
}) => {
  return (
    <li className={card}>
      <h3>Name: {name}</h3>
      <h4>Region: {region}</h4>
      <h4>Population: {population}</h4>
      <div className={card__imgContainer}>
        <img src={flags.png} alt={`${flags.alt ? flags.alt : ''}`} />
      </div>
    </li>
  );
};
export default Card;
