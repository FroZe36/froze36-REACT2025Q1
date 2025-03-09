import { useNavigate, useParams } from 'react-router';
import { StarshipShortProperties } from '../../types/types';
import { RouteParams } from '../../types/types';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  addStarship,
  removeStarship,
  selectStarshipByName,
} from '../../redux/selectedStarshipsSlice';

const BottomCard: FC<{ starship: StarshipShortProperties }> = ({
  starship,
}) => {
  const { name, model, manufacturer, length, consumables } = starship;
  const navigate = useNavigate();
  const { pageId } = useParams<RouteParams>();
  const isSelected = useAppSelector((state) =>
    selectStarshipByName(state, name)
  );
  const dispatch = useAppDispatch();

  const handleCheckboxChange = () => {
    if (isSelected) {
      dispatch(removeStarship(name));
    } else {
      dispatch(addStarship(starship));
    }
  };

  return (
    <li className="card" data-testid="card">
      <ul className="listCard text__secondary">
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
      <div className="actionContainerCard">
        <button
          type="button"
          onClick={() => navigate(`/starships/${pageId}/${name}`)}
        >
          Details
        </button>
        <label className="actionLabel text__primary">
          Select Element
          <input
            type="checkbox"
            checked={!!isSelected}
            onChange={handleCheckboxChange}
          />
        </label>
      </div>
    </li>
  );
};

export default BottomCard;
