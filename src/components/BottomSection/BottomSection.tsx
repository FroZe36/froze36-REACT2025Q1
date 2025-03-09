import BottomCardList from '../BottomCardList/BottomCardList';
import { useGetStarshipsQuery } from '../../api/StarWarsService';
import { Spinner } from '../Spinner/Spinner';
import ButtonError from '../ButtonError/ButtonError';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Pagination from '../Pagination/Pagination';
import { FC, memo, ReactNode } from 'react';
import { RouteParams } from '../../types/types';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/hooks/hooks';
import { selectSearchParam } from '@/redux/searchParamsSlice';
interface BottomSectionProp {
  children?: ReactNode;
}

const BottomSection: FC<BottomSectionProp> = ({ children }) => {
  const router = useRouter();
  const { pageId } = router.query as RouteParams;
  const searchTerm = useAppSelector((state) => selectSearchParam(state));
  const { error, isLoading, isFetching, data } = useGetStarshipsQuery({
    searchParam: searchTerm,
    pageNum: Number(pageId) <= 0 ? 1 : Number(pageId),
  });
  return (
    <section className="bottomSection">
      <h1 className="title">Starships from The Star Wars</h1>
      <h2 className="subtitle text__primary">
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
        {children}
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
