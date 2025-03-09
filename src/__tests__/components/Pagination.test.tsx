import { render, screen, waitFor } from '@testing-library/react';
import Pagination from '../../components/Pagination/Pagination';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('Pagination', () => {
  it('should updates URL query paramater when page changes', async () => {
    render(
      <div>
        <Pagination count={36} />
      </div>
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

    expect(mockRouter.pathname).toBe('/starships/1');
  });
  it('should default to page 1 if pageId is invalid', async () => {
    render(
      <div>
        <Pagination count={36} />
      </div>
    );

    const pageNumber = screen.getByTestId('pageNumber');
    expect(pageNumber).toHaveTextContent('1');
  });
});
