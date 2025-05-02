import _ from 'lodash';
import { reviews } from '../../lib/reviews';
import { trpc } from '../../lib/trpc';

export const getReviewsTrpcRoute = trpc.procedure.query(() => {
  return { reviews: reviews.map((review) => _.pick(review, ['nick', 'name', 'description'])) };
});
