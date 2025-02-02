import { PureComponent } from 'react';
import { StarshipShortProperties } from '../../api/StarWarsService';

class BottomCard extends PureComponent<{ starship: StarshipShortProperties }> {
  render() {
    const { name, model, manufacturer, length, consumables } =
      this.props.starship;
    return (
      <li>
        <ul>
          <li>The name: {name}</li>
          <li>The model: {model}</li>
          <li>The manufacturer: {manufacturer}</li>
          <li>The length: {length}</li>
          <li>Consumables: {consumables}</li>
        </ul>
      </li>
    );
  }
}

export default BottomCard;
