import { PureComponent } from 'react';
import BottomCardList from '../BottomCardList/BottomCardList';
import { StarshipShortProperties } from '../../api/StarWarsService';
interface BottomSectionProp {
  loadingState: boolean;
  data: StarshipShortProperties[];
}
class BottomSection extends PureComponent<BottomSectionProp> {
  render() {
    const { data } = this.props;
    return (
      <section>
        <h1>Starships from The Star Wars</h1>
        <h2>
          A Starship resource is a single transport craft that has hyperdrive
          capability.
        </h2>
        <BottomCardList data={data} />
      </section>
    );
  }
}

export default BottomSection;
