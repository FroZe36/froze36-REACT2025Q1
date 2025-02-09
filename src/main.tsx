import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.tsx';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import BottomCardDetails from './components/BottomCardDetails/BottomCardDetails.tsx';
import NotFoundPage from './components/NotFoundPage/NotFoundPage.tsx';

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="starships/1" replace /> },
  {
    path: '/starships/:pageId',
    element: <App />,
    children: [
      {
        path: '/starships/:pageId/:starshipId',
        element: <BottomCardDetails />,
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
    <RouterProvider router={router} />
  </StrictMode>
);
