import BottomCardList from '../BottomCardList/BottomCardList';
import { StarshipData } from '../../api/StarWarsService';
import { Spinner } from '../Spinner/Spinner';
import './BottomSection.scss';
import ButtonError from '../ButtonError/ButtonError';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Pagination from '../Pagination/Pagination';
import { Outlet } from 'react-router';
interface BottomSectionProp {
  loadingState: boolean;
  data: StarshipData | null;
  error: string | null;
}
const BottomSection = (props: BottomSectionProp) => {
  const { data, loadingState, error } = props;
  return (
    <section className="bottomSection">
      <h1 className="title">Starships from The Star Wars</h1>
      <h2 className="subtitle">
        A Starship resource is a single transport craft that has hyperdrive
        capability.
      </h2>
      <div className="container">
        <ErrorBoundary>
          {loadingState ? (
            <Spinner />
          ) : (
            <BottomCardList data={data?.results ?? []} error={error} />
          )}
        </ErrorBoundary>
        <Outlet />
      </div>
      <div className="buttonContainer">
        {data?.results && data?.results.length !== 0 ? (
          <Pagination
            prev={data.previous}
            next={data.next}
            count={data.count}
          />
        ) : null}
        <ButtonError />
      </div>
    </section>
  );
};

export default BottomSection;
