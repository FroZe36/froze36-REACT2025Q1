import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.tsx';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import BottomCardDetails from './components/BottomCardDetails/BottomCardDetails.tsx';
import NotFoundPage from './components/NotFoundPage/NotFoundPage.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import ThemeProvider from './components/theme/ThemeProvider.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="starships/1" replace />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/starships/:pageId',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/starships/:pageId/:starshipId',
        element: <BottomCardDetails />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
