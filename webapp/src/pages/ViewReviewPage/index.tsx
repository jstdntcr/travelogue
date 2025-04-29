import { useParams } from 'react-router-dom';
import css from './index.module.scss';
import { Segment } from '../../components/Segment';
import { ViewReviewRouteParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

export const ViewReviewPage = () => {
  const { reviewNick } = useParams() as ViewReviewRouteParams;

  const { data, error, isLoading, isFetching, isError } = trpc.getReview.useQuery({ reviewNick });

  if (isLoading || isFetching) return <span>Loading...</span>;
  if (isError) return <span>Error: {error.message}</span>;
  if (!data?.review) return <span>Idea not found</span>;

  return (
    <Segment title={data.review.name} description={data.review.description}>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: data.review.text }} />
    </Segment>
  );
};
