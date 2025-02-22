import BottomCardList from '../BottomCardList/BottomCardList';
import { useGetStarshipsQuery } from '../../api/StarWarsService';
import { Spinner } from '../Spinner/Spinner';
import './BottomSection.scss';
import ButtonError from '../ButtonError/ButtonError';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Pagination from '../Pagination/Pagination';
import { Outlet, useParams } from 'react-router';
import { FC, memo } from 'react';
import { RouteParams } from '../../types/types';
interface BottomSectionProp {
  storageData: string;
}
const BottomSection: FC<BottomSectionProp> = ({ storageData }) => {
  const { pageId } = useParams<RouteParams>();
  const { error, isLoading, isFetching, data } = useGetStarshipsQuery({
    searchParam: storageData,
    pageNum: Number(pageId) <= 0 ? 1 : Number(pageId),
  });
  return (
    <section className="bottomSection">
      <h1 className="title">Starships from The Star Wars</h1>
      <h2 className="subtitle">
        A Starship resource is a single transport craft that has hyperdrive
        capability.
      </h2>
      <div className="container">
        <ErrorBoundary>
          {isLoading || isFetching ? (
            <Spinner />
          ) : (
            <BottomCardList data={data?.results ?? []} error={error} />
          )}
        </ErrorBoundary>
        <Outlet />
      </div>
      <div className="buttonContainer">
        {data?.results && data?.results.length ? (
          <Pagination count={data.count} />
        ) : null}
        <ButtonError />
      </div>
    </section>
  );
};

export default memo(BottomSection);
