import { render, screen, waitFor } from '@testing-library/react';
import { createMockData } from '../mock/starships';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import Flyout from '../../components/Flyout/Flyout';
import { useAppSelector } from '../../hooks/hooks';
import { selectTotalStarships } from '../../redux/selectedStarshipsSlice';
import BottomCardList from '../../components/BottomCardList/BottomCardList';
import userEvent from '@testing-library/user-event';
vi.mock('next/router', () => vi.importActual('next-router-mock'));
describe('Flyout', () => {
  const ParentComponentForTest = () => {
    const selectedStarshipsLength = useAppSelector((state) =>
      selectTotalStarships(state)
    );
    return (
      <>
        <BottomCardList data={createMockData(5)} />
        {selectedStarshipsLength ? <Flyout /> : null};
      </>
    );
  };
  it('should render Flyout if user click on card', async () => {
    render(
      <Provider store={store}>
        <ParentComponentForTest />
      </Provider>
    );

    const card = screen.getAllByTestId('card');
    const checkbox = screen.getAllByRole('checkbox');

    expect(card[0]).toBeInTheDocument();
    expect(checkbox[0]).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(checkbox[0]);

    await waitFor(() => {
      const flyout = screen.getByTestId('flyout');
      expect(flyout).toBeInTheDocument();
    });
  });
  it('should remove Flyout when click button Unselect All', async () => {
    render(
      <Provider store={store}>
        <ParentComponentForTest />
      </Provider>
    );

    const card = screen.getAllByTestId('card');
    const checkbox = screen.getAllByRole('checkbox');

    expect(card[0]).toBeInTheDocument();
    expect(checkbox[0]).toBeInTheDocument();
    const user = userEvent.setup();

    await user.click(checkbox[0]);
    await user.click(checkbox[1]);
    await user.click(checkbox[2]);

    await waitFor(() => {
      expect(checkbox[0]).not.toBeChecked();
      const flyout = screen.getByTestId('flyout');
      expect(flyout).toBeInTheDocument();
    });
    const buttonUnselectAll = screen.getByRole('button', {
      name: /unselect all/i,
    });
    await user.click(buttonUnselectAll);

    await waitFor(() => {
      expect(screen.queryByTestId('flyout')).not.toBeInTheDocument();
    });
  });
});
