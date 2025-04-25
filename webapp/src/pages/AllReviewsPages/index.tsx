import { Link } from 'react-router-dom';
import { getViewReviewRoute } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

export const AllReviewsPages = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getReviews.useQuery();

  if (isLoading || isFetching) return <span>Loading...</span>;
  if (isError) return <span>Error: {error.message}</span>;

  return (
    <div>
      <h2>All Reviews</h2>
      <div className="reviews-container">
        {data?.reviews.map((review) => (
          <div className="review-card" key={review.nick}>
            <h3>
              <Link to={getViewReviewRoute({ reviewNick: review.nick })}>{review.name}</Link>
            </h3>
            <p>{review.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
