import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppLayout from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import Main from './components/Main.tsx';
import FormUncontrolled from './components/FormUncontrolled.tsx';
import FormReactHook from './components/FormReactHook.tsx';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Main />} />
          <Route path="/uncontrolled" element={<FormUncontrolled />} />
          <Route path="/controlled" element={<FormReactHook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
