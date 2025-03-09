import { FC, useState } from 'react';
import { RouteParams } from '../../types/types';
import { useRouter } from 'next/router';
import styles from './Pagination.module.scss';
interface PaginationProps {
  count: number;
}
const { containerPagination } = styles;

const Pagination: FC<PaginationProps> = ({ count }) => {
  const router = useRouter();
  const { pageId } = router.query as RouteParams;
  const [pageNumber, setPageNumber] = useState(() =>
    Number(pageId) <= 0 || isNaN(Number(pageId)) ? 1 : Number(pageId)
  );
  const elementsPerPage = 10;
  const numberOfPages = Math.ceil(count / elementsPerPage);
  function prevClickHandler() {
    router.push(`/starships/${pageNumber - 1}`);
    setPageNumber((prevState) => prevState - 1);
  }
  function nextClickHandler() {
    router.push(`/starships/${pageNumber + 1}`);
    setPageNumber((prevState) => prevState + 1);
  }
  return (
    <div className={containerPagination}>
      <button
        onClick={prevClickHandler}
        type="button"
        disabled={pageNumber <= 1}
      >
        Previous
      </button>
      <h1 className="text__primary" data-testid="pageNumber">
        {pageNumber}
      </h1>
      <button
        onClick={nextClickHandler}
        type="button"
        disabled={pageNumber >= numberOfPages}
      >
        Next
      </button>
    </div>
  );
};
export default Pagination;
