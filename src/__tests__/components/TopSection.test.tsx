import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TopSection from '../../components/TopSection/TopSection';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
vi.mock('next/router', () => vi.importActual('next-router-mock'));
describe('TopSection', () => {
  vi.spyOn(Storage.prototype, 'getItem');
  vi.spyOn(Storage.prototype, 'setItem');

  const localStorageKeyName = 'savedInputValue';

  it('should saves the entered value to the local storage when click SearchButton', async () => {
    render(
      <Provider store={store}>
        <TopSection />
      </Provider>
    );
    const buttonSearch = screen.getByRole('button', { name: /search/i });
    const inputSearch = screen.getByRole('textbox');
    expect(buttonSearch).toBeInTheDocument();
    expect(inputSearch).toBeInTheDocument();

    const user = userEvent.setup();
    await user.type(inputSearch, 'abc');
    expect(inputSearch).toHaveValue('abc');
    await user.click(buttonSearch);

    expect(localStorage.getItem(localStorageKeyName)).toBe('abc');
    expect(localStorage.getItem).toHaveBeenCalledWith(localStorageKeyName);
  });

  it('should component get the value from local storage upon mounting', () => {
    localStorage.setItem(localStorageKeyName, '123');

    render(
      <Provider store={store}>
        <TopSection />
      </Provider>
    );
    expect(localStorage.getItem(localStorageKeyName)).toBe('123');
    expect(localStorage.getItem).toHaveBeenCalledWith(localStorageKeyName);
  });
});
