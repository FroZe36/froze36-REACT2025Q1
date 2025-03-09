import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import SearchPage from '../../components/SearchPage/SearchPage';
import { store } from '../../redux/store';
import { MemoryRouter, Route, Routes } from 'react-router';
import NotFoundPage from '../../components/NotFoundPage/NotFoundPage';

describe('SearchPage', () => {
  it('should render SearchPage if there is Provider with store', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchPage />
        </MemoryRouter>
      </Provider>
    );
  });
  it('should render "NotFoundPage" if the link is not correct', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Routes>
          <Route path="/starships/:pageId" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('notFoundPage')).toHaveTextContent(
      '404 NotFoundPage'
    );
  });
});
