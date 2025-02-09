import { Routes, Route, Navigate } from 'react-router';
import './App.scss';
import SearchPage from './components/SearchPage/SearchPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import BottomCardDetails from './components/BottomCardDetails/BottomCardDetails';

const App = () => {
  return (
    <Routes>
      <Route
        element={<Navigate to="starships/1" replace />}
        path="/"
        errorElement={<NotFoundPage />}
        index
      />
      {/* <Route
        element={<Navigate to="/starships/1" replace />}
        path="/starships"
        errorElement={<NotFoundPage />}
      /> */}
      <Route
        path="/starships/:pageId"
        element={<SearchPage />}
        errorElement={<NotFoundPage />}
      >
        <Route
          path="/starships/:pageId/:starshipId"
          element={<BottomCardDetails />}
          errorElement={<NotFoundPage />}
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
