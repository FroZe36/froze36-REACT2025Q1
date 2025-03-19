import { useRef } from 'react';
import './App.css';
import CardList from './components/CardList/CardList';
import Search from './components/Search/Search';

function App() {
  const refForm = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <main>
      <Search ref={refForm} refInput={inputRef} />
      <CardList />
    </main>
  );
}

export default App;
