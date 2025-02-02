import { PureComponent } from 'react';
import BottomCardList from '../BottomCardList/BottomCardList';

class BottomSection extends PureComponent {
  render() {
    return (
      <section>
        <BottomCardList />
      </section>
    );
  }
}

export default BottomSection;
