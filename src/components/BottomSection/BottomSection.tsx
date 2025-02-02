import { PureComponent } from 'react';
import BottomCardList from '../BottomCardList/BottomCardList';
import { StarshipShortProperties } from '../../api/StarWarsService';
import { Spinner } from '../Spinner/Spinner';
import './BottomSection.scss';
import ButtonError from '../ButtonError/ButtonError';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { ErrorMsg } from '../ErrorMsg/ErrorMsg';
interface BottomSectionProp {
  loadingState: boolean;
  data: StarshipShortProperties[];
  error: string | null;
}
class BottomSection extends PureComponent<BottomSectionProp> {
  render() {
    const { data, loadingState, error } = this.props;
    return (
      <ErrorBoundary>
        <section className="bottomSection">
          <h1 className="title">Starships from The Star Wars</h1>
          <h2 className="subtitle">
            A Starship resource is a single transport craft that has hyperdrive
            capability.
          </h2>
          <ErrorBoundary>
            {error ? (
              <ErrorMsg />
            ) : loadingState ? (
              <Spinner />
            ) : (
              <BottomCardList data={data} />
            )}
            <ButtonError />
          </ErrorBoundary>
        </section>
      </ErrorBoundary>
    );
  }
}

export default BottomSection;
