import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import BottomSection from '../../components/BottomSection/BottomSection';
import { getStarships } from '@/api/StarWarsService';
vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('BottomSection', () => {
  it('should render Bottom Section if there is data', async () => {
    await store.dispatch(
      getStarships.initiate({ searchParam: '', pageNum: 1 })
    );
    render(
      <Provider store={store}>
        <BottomSection />
      </Provider>
    );
  });
});
