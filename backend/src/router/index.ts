// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createReviewTrpcRoute } from './createReview';
import { getReviewTrpcRoute } from './getReview';
import { getReviewsTrpcRoute } from './getReviews';
import { signUpTrpcRoute } from './signUp';
// @endindex
import { trpc } from '../lib/trpc';

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  createReview: createReviewTrpcRoute,
  getReview: getReviewTrpcRoute,
  getReviews: getReviewsTrpcRoute,
  signUp: signUpTrpcRoute,
  // @endindex
});

export type TrpcRouter = typeof trpcRouter;
