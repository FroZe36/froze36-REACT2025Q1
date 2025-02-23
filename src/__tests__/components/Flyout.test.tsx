import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { starshipsMock } from '../mock/starships';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import BottomCard from '../../components/BottomCard/BottomCard';

describe('Flyout', () => {
  it('should render Flyout if user click on card', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BottomCard starship={starshipsMock} />
        </MemoryRouter>
      </Provider>
    );

    const card = screen.getByTestId('card');
    const checkbox = screen.getByRole('checkbox');
    expect(card).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
  });
});
