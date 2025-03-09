import { RouteParams } from '../../types/types';
import { useGetStarshipQuery } from '../../api/StarWarsService';
import styles from './BottomCardDetails.module.scss';
import { useRouter } from 'next/router';

const { bottomCardDetails, cardDetailsItem, cardDetailsButton } = styles;

const BottomCardDetails = () => {
  const router = useRouter();
  const { starshipId, pageId } = router.query as RouteParams;
  const { data, error } = useGetStarshipQuery({
    name: starshipId ?? '',
  });

  const clearData = () => {
    router.push(`/starships/${pageId}`);
  };
  if (error) {
    throw error;
  }
  return (
    <>
      {data && (
        <ol
          className={`${bottomCardDetails} text__primary`}
          data-testid="cardDetails"
        >
          <button className={cardDetailsButton} onClick={clearData}>
            X
          </button>
          <li className={cardDetailsItem}>The name: {data?.results[0].name}</li>
          <li className={cardDetailsItem}>
            The model: {data?.results[0].model}
          </li>
          <li className={cardDetailsItem}>
            The manufacturer: {data?.results[0].manufacturer}
          </li>
          <li className={cardDetailsItem}>
            The length: {data?.results[0].length}
          </li>
          <li className={cardDetailsItem}>
            Consumables: {data?.results[0].consumables}
          </li>
        </ol>
      )}
    </>
  );
};
export default BottomCardDetails;
