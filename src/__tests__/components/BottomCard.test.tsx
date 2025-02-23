import { render, screen, waitFor } from '@testing-library/react';
import BottomCard from '../../components/BottomCard/BottomCard';
import { starshipsMock } from '../mock/starships';
import { MemoryRouter, Outlet, Route, Routes } from 'react-router';
import userEvent from '@testing-library/user-event';
import BottomCardDetails from '../../components/BottomCardDetails/BottomCardDetails';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

describe('BottomCard', () => {
  it('should render component with the relevant data', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BottomCard starship={starshipsMock} />
        </MemoryRouter>
      </Provider>
    );
    expect(
      screen.getByText(`The name: ${starshipsMock.name}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`The model: ${starshipsMock.name}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`The manufacturer: ${starshipsMock.name}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`The length: ${starshipsMock.name}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Consumables: ${starshipsMock.name}`)
    ).toBeInTheDocument();
  });
  it('should validate that clicking on a card, opens a detailed card component', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/starships/1']}>
          <Routes>
            <Route
              path="/starships/:pageId"
              element={
                <ul>
                  <BottomCard starship={starshipsMock} />
                  <Outlet />
                </ul>
              }
            >
              <Route path=":starshipId" element={<BottomCardDetails />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    const card = screen.getByTestId('card');
    const button = screen.getByRole('button', { name: /details/i });
    expect(card).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByTestId('cardDetails')).toBeInTheDocument();
    });
  });
  it('should triggers an additional API call to fetch detailed information', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/starships/1']}>
          <Routes>
            <Route
              path="/starships/:pageId"
              element={
                <ul>
                  <BottomCard starship={starshipsMock} />
                  <Outlet />
                </ul>
              }
            >
              <Route path=":starshipId" element={<BottomCardDetails />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(card);
  });
});
