import { StarshipShortProperties } from '../../api/StarWarsService';

const BottomCard = (props: {
  starship: StarshipShortProperties;
  handlerChange: (e: string) => void;
}) => {
  const { name, model, manufacturer, length, consumables } = props.starship;
  return (
    <li onClick={() => props.handlerChange(name)}>
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
