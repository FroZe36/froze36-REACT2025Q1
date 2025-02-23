import { useParams } from 'react-router';
import { RouteParams } from '../../types/types';
import { Spinner } from '../Spinner/Spinner';
import { getStarship, StarshipData } from '../../api/StarWarsService';
import { useEffect, useState } from 'react';
import './BottomCardDetails.scss';

const BottomCardDetails = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<StarshipData | null>();
  const [error, setError] = useState<string | null>();
  const { starshipId } = useParams<RouteParams>();

  async function fetchData(searchQuery: string) {
    setLoading((prevState) => !prevState);
    try {
      const data = await getStarship(searchQuery);
      if (data) {
        setData(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        setData(null);
        setError(error.message);
      }
    } finally {
      setLoading((prevState) => !prevState);
    }
  }
  useEffect(() => {
    if (starshipId) fetchData(starshipId);
  }, [starshipId]);

  const clearData = () => {
    setData(null);
  };

  if (error) {
    throw error;
  }
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        data && (
          <ol className="bottomCardDetails" data-testid="cardDetails">
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
