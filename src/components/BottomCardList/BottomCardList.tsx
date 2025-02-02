import { PureComponent } from 'react';
import { StarshipShortProperties } from '../../api/StarWarsService';
import BottomCard from '../BottomCard/BottomCard';

interface BottomCardListProp {
  data: StarshipShortProperties[];
}
class BottomCardList extends PureComponent<BottomCardListProp> {
  render() {
    const { data } = this.props;
    return (
      <ul className="list">
        {data.map((item) => (
          <BottomCard starship={{ ...item }} key={item.name} />
        ))}
      </ul>
    );
  }
}

export default BottomCardList;
