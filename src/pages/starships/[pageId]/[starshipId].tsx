import BottomCardDetails from '@/components/BottomCardDetails/BottomCardDetails';
import SearchPageLayout from '../[pageId]';
import { wrapper } from '@/redux/store';
import { RouteParams } from '@/types/types';
import {
  getRunningQueriesThunk,
  getStarship,
  getStarships,
} from '@/api/StarWarsService';

const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      const { pageId, starshipId } = query as RouteParams;
      const { searchParam } = store.getState().searchParams;
      await store.dispatch(
        getStarships.initiate({
          searchParam: searchParam,
          pageNum: Number(pageId),
        })
      );
      await store.dispatch(
        getStarship.initiate({
          name: starshipId ?? '',
        })
      );
      await Promise.all(store.dispatch(getRunningQueriesThunk()));
      return {
        props: {},
      };
    }
);

const DetailsPage = () => {
  return (
    <SearchPageLayout>
      <BottomCardDetails />
    </SearchPageLayout>
  );
};

export { getServerSideProps, DetailsPage as default };
