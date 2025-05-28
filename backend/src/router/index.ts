import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createReviewTrpcRoute } from './createReview';
import { getMeTrpcRoute } from './getMe';
import { getReviewTrpcRoute } from './getReview';
import { getReviewsTrpcRoute } from './getReviews';
import { signInTrpcRoute } from './signIn';
import { signUpTrpcRoute } from './signUp';
import { updateReviewTrpcRoute } from './updateReview';
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
  updateReview: updateReviewTrpcRoute,
  // @endindex
});

export type TrpcRouter = typeof trpcRouter;
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>;
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>;
