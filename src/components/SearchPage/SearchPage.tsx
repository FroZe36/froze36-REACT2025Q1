import { PureComponent } from 'react';
import TopSection from '../TopSection/TopSection';
import BottomSection from '../BottomSection/BottomSection';

class SearchPage extends PureComponent {
  render() {
    return (
      <main>
        <TopSection />
        <BottomSection />
      </main>
    );
  }
}

export default SearchPage;
