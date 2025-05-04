import { zCreateReviewTrpcInput } from './input';
import { reviews } from '../../lib/reviews';
import { trpc } from '../../lib/trpc';

export const createReviewTrpcRoute = trpc.procedure.input(zCreateReviewTrpcInput).mutation(({ input }) => {
  if (reviews.find((review) => review.nick === input.nick)) {
    throw Error('Review with this nick already exists');
  }
  reviews.unshift(input);
  return true;
});
