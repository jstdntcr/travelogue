import { getReviewTrpcRoute } from './getReview';
import { getReviewsTrpcRoute } from './getReviews';
import { trpc } from '../lib/trpc';

export const trpcRouter = trpc.router({
  getReviews: getReviewsTrpcRoute,
  getReview: getReviewTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
