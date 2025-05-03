// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { getReviewTrpcRoute } from './getReview';
import { getReviewsTrpcRoute } from './getReviews';
// @endindex
import { trpc } from '../lib/trpc';

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  getReview: getReviewTrpcRoute,
  getReviews: getReviewsTrpcRoute,
  // @endindex
});

export type TrpcRouter = typeof trpcRouter;
