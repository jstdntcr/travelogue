import { useParams } from 'react-router-dom';
import css from './index.module.scss';
import { ViewReviewRouteParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

export const ViewReviewPage = () => {
  const { reviewNick } = useParams() as ViewReviewRouteParams;

  const { data, error, isLoading, isFetching, isError } = trpc.getReview.useQuery({ reviewNick });

  if (isLoading || isFetching) return <span>Loading...</span>;
  if (isError) return <span>Error: {error.message}</span>;
  if (!data?.review) return <span>Idea not found</span>;

  return (
    <div>
      <h1 className={css.title}>{data.review.name}</h1>
      <p className={css.description}>{data.review.description}</p>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: data.review.text }} />
    </div>
  );
};
