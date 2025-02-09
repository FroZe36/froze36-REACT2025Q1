import BottomCardList from '../BottomCardList/BottomCardList';
import { StarshipShortProperties } from '../../api/StarWarsService';
import { Spinner } from '../Spinner/Spinner';
import './BottomSection.scss';
import ButtonError from '../ButtonError/ButtonError';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Pagination from '../Pagination/Pagination';
interface BottomSectionProp {
  loadingState: boolean;
  data: StarshipShortProperties[];
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
      <ErrorBoundary>
        {loadingState ? (
          <Spinner />
        ) : (
          <BottomCardList data={data} error={error} />
        )}
      </ErrorBoundary>
      <div className="buttonContainer">
        <Pagination />
        <ButtonError />
      </div>
    </section>
  );
};

export default BottomSection;
