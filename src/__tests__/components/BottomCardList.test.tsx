import { render, screen } from '@testing-library/react';
import BottomCardList from '../../components/BottomCardList/BottomCardList';
import { getStarships } from '../../api/StarWarsService';
import { MemoryRouter } from 'react-router';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

describe('BottomCardList', () => {
  it('should render no starships when the array is empty', () => {
    render(<BottomCardList data={[]} error={null} />);
    expect(screen.getByText(/no starships/i)).toBeInTheDocument();
  });
  it('should render starships according mockData length', async () => {
    const mockData = await getStarships('', 1);
    render(
      <MemoryRouter>
        <BottomCardList data={mockData.results} error={null} />
      </MemoryRouter>
    );
    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(mockData.results.length);
  });
  it('should throw an error when error is provided', () => {
    const errorMessage = 'Error: Something went wrong';
    render(
      <ErrorBoundary>
        <BottomCardList data={[]} error={errorMessage} />
      </ErrorBoundary>
    );
    expect(screen.getByTestId('errorElement')).toBeInTheDocument();
  });
});
