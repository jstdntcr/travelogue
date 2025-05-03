import { zCreateReviewTrpcInput } from './input';
import { reviews } from '../../lib/reviews';
import { trpc } from '../../lib/trpc';

export const createReviewTrpcRoute = trpc.procedure.input(zCreateReviewTrpcInput).mutation(({ input }) => {
  reviews.unshift(input);
  return true;
});
