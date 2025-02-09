import { useNavigate } from 'react-router';
import './Pagination.scss';
const Pagination = () => {
  const navigate = useNavigate();
  return (
    <div className="containerPagination">
      <button onClick={() => navigate(-1)}>Previous</button>
      <button onClick={() => navigate(1)}>Next</button>
    </div>
  );
};
export default Pagination;
