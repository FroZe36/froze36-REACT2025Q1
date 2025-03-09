import { RouteParams, StarshipShortProperties } from '../../types/types';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  addStarship,
  removeStarship,
  selectStarshipByName,
} from '../../redux/selectedStarshipsSlice';
import { useRouter } from 'next/router';

const BottomCard: FC<{ starship: StarshipShortProperties }> = ({
  starship,
}) => {
  const { name, model, manufacturer, length, consumables } = starship;
  const router = useRouter();
  const { pageId } = router.query as RouteParams;
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
          onClick={() => router.push(`/starships/${pageId}/${name}`)}
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
