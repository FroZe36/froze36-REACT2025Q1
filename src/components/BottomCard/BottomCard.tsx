import { useNavigate, useParams } from 'react-router';
import { StarshipShortProperties } from '../../api/StarWarsService';
import { RouteParams } from '../../types/types';

const BottomCard = (props: { starship: StarshipShortProperties }) => {
  const { name, model, manufacturer, length, consumables } = props.starship;
  const navigate = useNavigate();
  const { pageId } = useParams<RouteParams>();
  return (
    <li
      className="card"
      onClick={() => navigate(`/starships/${pageId}/${name}`)}
    >
      <ul className="listCard">
        <li className="cardItem">The name: {name}</li>
        <li className="cardItem">The model: {model}</li>
        <li className="cardItem">The manufacturer: {manufacturer}</li>
        <li className="cardItem">The length: {length}</li>
        <li className="cardItem">Consumables: {consumables}</li>
      </ul>
    </li>
  );
};

export default BottomCard;
