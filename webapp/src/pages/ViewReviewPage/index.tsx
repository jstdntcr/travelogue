import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import css from './index.module.scss';
import { LinkButton } from '../../components/Button';
import { Segment } from '../../components/Segment';
import { useMe } from '../../lib/ctx';
import { ViewReviewRouteParams } from '../../lib/routes';
import { getUpdateReviewRoute } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

export const ViewReviewPage = () => {
  const { reviewNick } = useParams() as ViewReviewRouteParams;

  const getReviewResult = trpc.getReview.useQuery({ reviewNick: reviewNick });
  const me = useMe();

  if (getReviewResult.isLoading || getReviewResult.isFetching) return <span>Loading...</span>;
  if (getReviewResult.isError) return <span>Error: {getReviewResult.error.message}</span>;

  if (!getReviewResult.data?.review) return <span>Idea not found</span>;

  const review = getReviewResult.data.review;

  return (
    <Segment title={review.name} description={getReviewResult.data.review.description}>
      <div className={css.createdAt}>Created At: {format(review.createdAt, 'dd-MM-yyyy')}</div>
      <div className={css.author}>Author: {review.author.nick}</div>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: review.text }} />
      {review.authorId === me?.id && (
        <div className={css.updateButton}>
          <LinkButton to={getUpdateReviewRoute({ reviewNick: review.nick })}>Update Review</LinkButton>
        </div>
      )}
    </Segment>
  );
};
