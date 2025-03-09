import { render, screen, waitFor } from '@testing-library/react';
import BottomCardList from '../../components/BottomCardList/BottomCardList';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { createMockData } from '../mock/starships';
vi.mock('next/router', () => vi.importActual('next-router-mock'));
const mockStarshipsData = createMockData(6);

describe('BottomCardList', () => {
  it('should render no starships when the array is empty', () => {
    render(<BottomCardList data={[]} />);
    expect(screen.getByText(/no starships/i)).toBeInTheDocument();
  });
  it('should render starships according mockData length', async () => {
    render(
      <Provider store={store}>
        <BottomCardList data={mockStarshipsData} />
      </Provider>
    );
    await waitFor(() => {
      const cards = screen.getAllByTestId('card');
      expect(cards).toHaveLength(mockStarshipsData.length);
    });
  });
});
