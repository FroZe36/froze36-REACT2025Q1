import { useNavigate, useParams } from 'react-router';
import './Pagination.scss';
import { FC, useEffect, useState } from 'react';
import { RouteParams } from '../../types/types';

interface PaginationProps {
  count: number;
}
const Pagination: FC<PaginationProps> = ({ count }) => {
  const navigate = useNavigate();
  const { pageId } = useParams<RouteParams>();
  const [pageNumber, setPageNumber] = useState(
    Number(pageId) <= 0 || isNaN(Number(pageId)) ? 1 : Number(pageId)
  );
  const elementsPerPage = 10;
  const numberOfPages = Math.ceil(count / elementsPerPage);
  useEffect(() => {
    navigate(`/starships/${pageNumber}`);
  }, [pageNumber, navigate]);
  function prevClickHandler() {
    setPageNumber((prevState) => prevState - 1);
  }
  function nextClickHandler() {
    setPageNumber((prevState) => prevState + 1);
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
      <h1 data-testid="pageNumber">{pageNumber}</h1>
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
