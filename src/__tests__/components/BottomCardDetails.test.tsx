import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import BottomCardDetails from '../../components/BottomCardDetails/BottomCardDetails';
import { starshipsMock } from '../mock/starships';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

describe('BottomCardDetails', () => {
  it('should render loader while fetching data', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/starships/test']}>
          <Routes>
            <Route
              path="/starships/:starshipId"
              element={<BottomCardDetails />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    await waitForElementToBeRemoved(screen.getByTestId('spinner'));
    expect(screen.getByTestId('cardDetails')).toBeInTheDocument();
  });
  it('should correctly displays detailed card data', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/starships/test']}>
          <Routes>
            <Route
              path="/starships/:starshipId"
              element={<BottomCardDetails />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('cardDetails')).toBeInTheDocument();
    });
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
  it('should delete component when click the close button', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/starships/test']}>
          <Routes>
            <Route
              path="/starships/:starshipId"
              element={<BottomCardDetails />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('cardDetails')).toBeInTheDocument();
    });
    const buttonClose = screen.getByRole('button', { name: /x/i });
    expect(buttonClose).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(buttonClose);

    await waitFor(() => {
      expect(screen.queryByTestId('cardDetails')).not.toBeInTheDocument();
    });
  });

  it('should throw Error when an error occurs', async () => {
    render(
      <MemoryRouter initialEntries={['/starships/error']}>
        <Routes>
          <Route
            path="/starships/:starshipId"
            element={
              <ErrorBoundary>
                <BottomCardDetails />
              </ErrorBoundary>
            }
          />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId('errorElement')).toBeInTheDocument();
    });
  });
});
