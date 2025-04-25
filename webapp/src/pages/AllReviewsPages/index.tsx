import { Link } from 'react-router-dom';
import css from './index.module.scss';
import { getViewReviewRoute } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

export const AllReviewsPages = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getReviews.useQuery();

  if (isLoading || isFetching) return <span>Loading...</span>;
  if (isError) return <span>Error: {error.message}</span>;

  return (
    <div>
      <h1 className={css.title}>All Reviews</h1>
      <div className={css.reviews}>
        {data?.reviews.map((review) => (
          <div className={css.review} key={review.nick}>
            <h2 className={css.reviewName}>
              <Link className={css.reviewLink} to={getViewReviewRoute({ reviewNick: review.nick })}>{review.name}</Link>
            </h2>
            <p className={css.reviewDescription}>{review.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
