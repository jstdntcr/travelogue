import { initTRPC } from '@trpc/server';
import _ from 'lodash';

const reviews = _.times(100, (i) => ({
  nick: `cool-review-${i}`,
  name: `review ${i}`,
  description: `review ${i} description`,
  text: _.times(100, (j) => `<p>Text paragraph of review ${i} and paragraph ${j}</p>`).join(''),
}));

const trpc = initTRPC.create();

export const routerTRPC = trpc.router({
  getReviews: trpc.procedure.query(() => {
    return { reviews: reviews.map((review) => _.pick(review, ['nick', 'name', 'description'])) };
  }),
});

export type AppRouter = typeof routerTRPC;
