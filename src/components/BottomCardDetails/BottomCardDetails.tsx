import { useParams } from 'react-router';
import { RouteParams } from '../../types/types';

const BottomCardDetails = () => {
  const { starshipId } = useParams<RouteParams>();
  return <div>asdasdasd{starshipId}</div>;
};
export default BottomCardDetails;
