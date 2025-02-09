import { StarshipShortProperties } from '../../api/StarWarsService';
import BottomCard from '../BottomCard/BottomCard';

interface BottomCardListProp {
  data: StarshipShortProperties[];
  error: string | null;
}

const BottomCardList = (props: BottomCardListProp) => {
  const { data, error } = props;
  if (error !== null) throw error;
  return (
    <ul className="list">
      {data.map((item) => (
        <BottomCard starship={{ ...item }} key={item.name} />
      ))}
    </ul>
  );
};

export default BottomCardList;
