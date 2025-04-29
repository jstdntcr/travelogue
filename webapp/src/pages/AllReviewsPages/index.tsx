import { Link } from 'react-router-dom';
import css from './index.module.scss';
import { Segment } from '../../components/Segment';
import { getViewReviewRoute } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

export const AllReviewsPages = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getReviews.useQuery();

  if (isLoading || isFetching) return <span>Loading...</span>;
  if (isError) return <span>Error: {error.message}</span>;

  return (
    <Segment title="All reviews">
      <div className={css.reviews}>
        {data?.reviews.map((review) => (
          <div className={css.review} key={review.nick}>
            <Segment  
            title={<Link className={css.reviewLink} to={getViewReviewRoute({ reviewNick: review.nick })}>{review.name}</Link>}
            size={2}
            description={review.description}/>
          </div>
        ))}
      </div>
      </Segment>
  );
};
