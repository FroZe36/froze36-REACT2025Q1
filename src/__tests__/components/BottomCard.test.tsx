import { render, screen, waitFor } from '@testing-library/react';
import BottomCard from '../../components/BottomCard/BottomCard';
import { starshipsMock } from '../mock/starships';
import { MemoryRouter, Outlet, Route, Routes } from 'react-router';
import userEvent from '@testing-library/user-event';
import BottomCardDetails from '../../components/BottomCardDetails/BottomCardDetails';
import { getStarship } from '../../api/StarWarsService';

describe('BottomCard', () => {
  it('should render component with the relevant data', () => {
    render(
      <MemoryRouter>
        <BottomCard starship={starshipsMock} />
      </MemoryRouter>
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
    );
    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(card);

    await waitFor(() => {
      expect(screen.getByTestId('cardDetails')).toBeInTheDocument();
    });
  });
  it('should triggers an additional API call to fetch detailed information', async () => {
    vi.mock('../../api/StarWarsService', () => ({
      getStarship: vi.fn().mockResolvedValue({
        count: 1,
        next: null,
        previous: null,
        results: [starshipsMock],
      }),
    }));
    render(
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
    );
    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(card);

    await waitFor(() => {
      expect(getStarship).toHaveBeenCalledWith('test');
    });
  });
});
