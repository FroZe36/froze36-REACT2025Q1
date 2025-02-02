import { PureComponent } from 'react';
import TopSectionInput from '../TopSectionInput/TopSectionInput';
import TopSectionButton from '../TopSectionButton/TopSectionButton';
class TopSection extends PureComponent {
  render() {
    return (
      <section>
        <TopSectionInput />
        <TopSectionButton />
      </section>
    );
  }
}

export default TopSection;
