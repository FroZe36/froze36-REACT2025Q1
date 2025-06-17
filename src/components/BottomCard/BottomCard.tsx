import { useNavigate, useParams } from 'react-router';
import { StarshipShortProperties } from '../../api/StarWarsService';
import { RouteParams } from '../../types/types';
import { FC } from 'react';

const BottomCard: FC<{ starship: StarshipShortProperties }> = ({
  starship,
}) => {
  const { name, model, manufacturer, length, consumables } = starship;
  const navigate = useNavigate();
  const { pageId } = useParams<RouteParams>();
  return (
    <li
      className="card"
      data-testid="card"
      onClick={() => navigate(`/starships/${pageId}/${name}`)}
    >
      <ul className="listCard">
        <li className="cardItem" data-testid="cardItem">
          The name: {name}
        </li>
        <li className="cardItem" data-testid="cardItem">
          The model: {model}
        </li>
        <li className="cardItem" data-testid="cardItem">
          The manufacturer: {manufacturer}
        </li>
        <li className="cardItem" data-testid="cardItem">
          The length: {length}
        </li>
        <li className="cardItem" data-testid="cardItem">
          Consumables: {consumables}
        </li>
      </ul>
    </li>
  );
};

export default BottomCard;
