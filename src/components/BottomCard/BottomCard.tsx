import { PureComponent } from 'react';
import { StarshipShortProperties } from '../../api/StarWarsService';

class BottomCard extends PureComponent<{ starship: StarshipShortProperties }> {
  render() {
    const { name, model, manufacturer, length, consumables } =
      this.props.starship;
    return (
      <li>
        <ul className="listCard">
          <li className="cardItem">The name: {name}</li>
          <li className="cardItem">The model: {model}</li>
          <li className="cardItem">The manufacturer: {manufacturer}</li>
          <li className="cardItem">The length: {length}</li>
          <li className="cardItem">Consumables: {consumables}</li>
        </ul>
      </li>
    );
  }
}

export default BottomCard;
