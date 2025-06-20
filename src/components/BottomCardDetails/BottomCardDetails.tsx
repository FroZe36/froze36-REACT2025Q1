import { useNavigate, useParams } from 'react-router';
import { RouteParams } from '../../types/types';
import { Spinner } from '../Spinner/Spinner';
import { useGetStarshipQuery } from '../../api/StarWarsService';
import './BottomCardDetails.scss';

const BottomCardDetails = () => {
  const { starshipId } = useParams<RouteParams>();
  const { data, isLoading, isFetching, error } = useGetStarshipQuery({
    name: starshipId ?? '',
  });
  const { pageId } = useParams<RouteParams>();
  const navigate = useNavigate();

  const clearData = () => {
    navigate(`/starships/${pageId}`);
  };

  if (error) {
    throw error;
  }
  return (
    <>
      {isLoading || isFetching ? (
        <Spinner />
      ) : (
        data && (
          <ol
            className="bottomCardDetails text__primary"
            data-testid="cardDetails"
          >
            <button className="cardDetailsButton" onClick={clearData}>
              X
            </button>
            <li className="cardDetailsItem">
              The name: {data?.results[0].name}
            </li>
            <li className="cardDetailsItem">
              The model: {data?.results[0].model}
            </li>
            <li className="cardDetailsItem">
              The manufacturer: {data?.results[0].manufacturer}
            </li>
            <li className="cardDetailsItem">
              The length: {data?.results[0].length}
            </li>
            <li className="cardDetailsItem">
              Consumables: {data?.results[0].consumables}
            </li>
          </ol>
        )
      )}
    </>
  );
};
export default BottomCardDetails;
