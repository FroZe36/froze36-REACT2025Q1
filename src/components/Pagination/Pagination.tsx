import { useNavigate, useParams } from 'react-router';
import './Pagination.scss';
import { FC, useEffect, useState } from 'react';
import { RouteParams } from '../../types/types';

interface PaginationProps {
  next: string | null;
  prev: string | null;
  count: number;
}
const Pagination: FC<PaginationProps> = ({ next, prev, count }) => {
  const navigate = useNavigate();
  const { pageId } = useParams<RouteParams>();
  const [pageNumber, setPageNumber] = useState(
    Number(pageId) <= 0 ? 1 : Number(pageId)
  );
  const elementsPerPage = 10;
  const numberOfPages = Math.round(count / elementsPerPage);
  useEffect(() => {
    navigate(`/starships/${pageNumber}`);
  }, [pageNumber, navigate]);
  function prevClickHandler() {
    if (prev) {
      setPageNumber((prevState) => prevState - 1);
    }
  }
  function nextClickHandler() {
    if (next) {
      setPageNumber((prevState) => prevState + 1);
    }
  }
  return (
    <div className="containerPagination">
      <button
        onClick={prevClickHandler}
        type="button"
        disabled={pageNumber <= 1}
      >
        Previous
      </button>
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
