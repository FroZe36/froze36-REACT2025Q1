import { render, screen, waitFor } from '@testing-library/react';
import BottomCardDetails from '../../components/BottomCardDetails/BottomCardDetails';
import { starshipsMock } from '../mock/starships';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import mockRouter from 'next-router-mock';
import { createDynamicRouteParser } from 'next-router-mock/dynamic-routes';
import { getStarship } from '@/api/StarWarsService';
mockRouter.useParser(createDynamicRouteParser(['/starships/[starshipId]']));
vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('BottomCardDetails', () => {
  it('should correctly displays detailed card data', async () => {
    mockRouter.push('/starships/test');
    const { starshipId } = mockRouter.query;
    await store.dispatch(getStarship.initiate({ name: starshipId as string }));
    render(
      <Provider store={store}>
        <BottomCardDetails />
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
        <BottomCardDetails />
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
      expect(screen.queryByTestId('cardDetails')).toBeInTheDocument();
    });
  });
});
