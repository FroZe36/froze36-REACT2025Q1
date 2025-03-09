import { render, screen, waitFor } from '@testing-library/react';
import BottomCardList from '../../components/BottomCardList/BottomCardList';
import { MemoryRouter } from 'react-router';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { SerializedError } from 'vitest';
import { createMockData } from '../mock/starships';

const mockStarshipsData = createMockData(6);

describe('BottomCardList', () => {
  it('should render no starships when the array is empty', () => {
    render(<BottomCardList data={[]} />);
    expect(screen.getByText(/no starships/i)).toBeInTheDocument();
  });
  it('should render starships according mockData length', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BottomCardList data={mockStarshipsData} />
        </MemoryRouter>
      </Provider>
    );
    await waitFor(() => {
      const cards = screen.getAllByTestId('card');
      expect(cards).toHaveLength(mockStarshipsData.length);
    });
  });
  it('should throw an error when error is provided', () => {
    const error: SerializedError = {
      name: 'NetworkError',
      message: 'Failed to fetch data',
      stack: 'Error: Failed to fetch data\n    at fetchData (example.js:10:15)',
      code: 'ERR_NETWORK',
    };
    render(
      <ErrorBoundary>
        <BottomCardList data={[]} error={error} />
      </ErrorBoundary>
    );
    expect(screen.getByTestId('errorElement')).toBeInTheDocument();
  });
});
