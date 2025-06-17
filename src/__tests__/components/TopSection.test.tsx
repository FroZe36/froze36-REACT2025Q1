import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TopSection from '../../components/TopSection/TopSection';
import { ChangeEvent, useEffect, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

describe('TopSection', () => {
  vi.spyOn(Storage.prototype, 'getItem');
  vi.spyOn(Storage.prototype, 'setItem');

  const localStorageKeyName = 'savedInputValue';

  const ParentComponentForTest = () => {
    const [inputValue, setInputValue] = useState('');
    const [storageData, setStorageData] = useLocalStorage(localStorageKeyName);

    useEffect(() => {
      setInputValue(storageData);
    }, [storageData]);
    const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };
    const handlerSearch = () => {
      setStorageData(inputValue);
    };
    return (
      <TopSection
        handlerSearch={handlerSearch}
        handlerChange={handlerChange}
        inputValue={inputValue}
      />
    );
  };

  it('should saves the entered value to the local storage when click SearchButton', async () => {
    render(<ParentComponentForTest />);
    const buttonSearch = screen.getByRole('button');
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

    render(<ParentComponentForTest />);
    expect(localStorage.getItem(localStorageKeyName)).toBe('123');
    expect(localStorage.getItem).toHaveBeenCalledWith(localStorageKeyName);
  });
});
