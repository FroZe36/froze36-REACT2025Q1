import { FC } from 'react';
import { StarshipShortProperties } from '../../api/StarWarsService';
import BottomCard from '../BottomCard/BottomCard';

interface BottomCardListProp {
  data: StarshipShortProperties[];
  error: string | null;
}

const BottomCardList: FC<BottomCardListProp> = ({ data, error }) => {
  if (error) throw error;
  if (data.length === 0) return <h2>No starships found, by this request</h2>;
  return (
    <ul className="list">
      {data.map((item) => (
        <BottomCard starship={{ ...item }} key={item.name} />
      ))}
    </ul>
  );
};

export default BottomCardList;
