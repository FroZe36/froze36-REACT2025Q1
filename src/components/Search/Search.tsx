import { FC, FormEvent, RefObject } from 'react';
import styles from './search.module.css';

const { search } = styles;
interface SearchProps {
  ref: RefObject<HTMLFormElement | null>;
  refInput: RefObject<HTMLInputElement | null>;
}

const Search: FC<SearchProps> = ({ ref, refInput }) => {
  const handlerForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form ref={ref} onSubmit={handlerForm} className={search}>
      <input type="text" name="search" id="search" ref={refInput} />
      <button type="submit">Search</button>
    </form>
  );
};
export default Search;
