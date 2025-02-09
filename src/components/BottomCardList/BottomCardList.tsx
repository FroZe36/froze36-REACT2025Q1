import { useNavigate, useParams } from 'react-router';
import { StarshipShortProperties } from '../../api/StarWarsService';
import BottomCard from '../BottomCard/BottomCard';
import { RouteParams } from '../../types/types';

interface BottomCardListProp {
  data: StarshipShortProperties[];
  error: string | null;
}

const BottomCardList = (props: BottomCardListProp) => {
  const { data, error } = props;
  if (error !== null) throw error;
  const navigate = useNavigate();
  const { pageId } = useParams<RouteParams>();
  const handlerClick = (e: string) => {
    navigate(`/starships/${pageId}/${e}`);
  };
  return (
    <ul className="list">
      {data.map((item) => (
        <BottomCard
          starship={{ ...item }}
          key={item.name}
          handlerChange={handlerClick}
        />
      ))}
    </ul>
  );
};

export default BottomCardList;
