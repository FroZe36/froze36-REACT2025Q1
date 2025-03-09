import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import BottomSection from '../../components/BottomSection/BottomSection';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

describe('BottomSection', () => {
  it('should render Bottom Section if there is data', () => {
    render(
      <Provider store={store}>
        <BottomSection storageData="" />
      </Provider>
    );
  });
  it('should throw Error when click ButtonError', async () => {
    render(
      <Provider store={store}>
        <ErrorBoundary>
          <BottomSection storageData="" />
        </ErrorBoundary>
      </Provider>
    );
    const btnError = screen.getByRole('button', { name: /throw error/i });
    const user = userEvent.setup();
    await user.click(btnError);

    await waitFor(() => {
      expect(screen.getByTestId('errorElement')).toBeInTheDocument();
    });
  });
});
