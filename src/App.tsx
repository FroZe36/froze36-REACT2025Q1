import { Routes, Route, Navigate } from 'react-router';
import './App.scss';
import SearchPage from './components/SearchPage/SearchPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

const App = () => {
  return (
    <Routes>
      <Route
        element={<Navigate to="/starships/1" replace />}
        path="/"
        errorElement={<NotFoundPage />}
      />
      <Route
        element={<Navigate to="/starships/1" replace />}
        path="/starships"
        errorElement={<NotFoundPage />}
      />
      <Route
        path="/starships/:id"
        element={<SearchPage />}
        errorElement={<NotFoundPage />}
      >
        <Route path=":name" errorElement={<NotFoundPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
