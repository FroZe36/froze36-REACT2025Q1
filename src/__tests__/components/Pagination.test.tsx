import { render, screen, waitFor } from '@testing-library/react';
import Pagination from '../../components/Pagination/Pagination';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router';
import userEvent from '@testing-library/user-event';

vi.mock('react-router', async () => ({
  ...(await vi.importActual('react-router')),
  useLocation: vi.fn().mockReturnValue({
    pathname: '/starships/1',
  }),
}));

describe('Pagination', () => {
  it('should updates URL query paramater when page changes', async () => {
    render(
      <MemoryRouter initialEntries={['/starships/1']}>
        <Routes>
          <Route
            path="/starships/:pageId"
            element={
              <div>
                <Pagination count={36} />
              </div>
            }
          />
        </Routes>
      </MemoryRouter>
    );
    const prevBtn = screen.getByRole('button', { name: /previous/i });
    const nextBtn = screen.getByRole('button', { name: /next/i });
    const pageNumber = screen.getByTestId('pageNumber');

    expect(prevBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();
    expect(prevBtn).toBeDisabled();
    expect(nextBtn).not.toBeDisabled();
    expect(pageNumber).toHaveTextContent('1');

    const user = userEvent.setup();
    await user.click(nextBtn);

    await waitFor(() => {
      expect(pageNumber).toHaveTextContent('2');
    });

    await user.click(prevBtn);

    await waitFor(() => {
      expect(pageNumber).toHaveTextContent('1');
    });

    const location = useLocation();
    expect(location.pathname).toBe('/starships/1');
  });
  it('should default to page 1 if pageId is invalid', async () => {
    render(
      <MemoryRouter initialEntries={['/starships/invalid']}>
        <Routes>
          <Route
            path="/starships/:pageId"
            element={
              <div>
                <Pagination count={36} />
              </div>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const pageNumber = screen.getByTestId('pageNumber');
    expect(pageNumber).toHaveTextContent('1');
  });
});
