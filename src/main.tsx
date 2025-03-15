import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppLayout from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import Main from './pages/Main.tsx';
import FormUncontrolled from './pages/FormUncontrolled.tsx';
import FormControlled from './pages/FormControlled.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Main />} />
            <Route path="/uncontrolled" element={<FormUncontrolled />} />
            <Route path="/controlled" element={<FormControlled />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
