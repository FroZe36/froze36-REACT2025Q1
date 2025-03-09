import { FC } from 'react';
import { StarshipShortProperties } from '../../types/types';
import BottomCard from '../BottomCard/BottomCard';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

interface BottomCardListProp {
  data: StarshipShortProperties[];
  error?: FetchBaseQueryError | SerializedError | undefined;
}

const BottomCardList: FC<BottomCardListProp> = ({ data, error }) => {
  if (error) throw error;
  if (data.length === 0)
    return (
      <h1 className="subtitle text__primary">
        No starships found, by this request
      </h1>
    );
  return (
    <ul className="list">
      {data.map((item) => (
        <BottomCard starship={{ ...item }} key={item.name} />
      ))}
    </ul>
  );
};

export default BottomCardList;
