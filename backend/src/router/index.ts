// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createReviewTrpcRoute } from './createReview';
import { getMeTrpcRoute } from './getMe';
import { getReviewTrpcRoute } from './getReview';
import { getReviewsTrpcRoute } from './getReviews';
import { signInTrpcRoute } from './signIn';
import { signUpTrpcRoute } from './signUp';
// @endindex
import { trpc } from '../lib/trpc';

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  createReview: createReviewTrpcRoute,
  getMe: getMeTrpcRoute,
  getReview: getReviewTrpcRoute,
  getReviews: getReviewsTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  // @endindex
});

export type TrpcRouter = typeof trpcRouter;
