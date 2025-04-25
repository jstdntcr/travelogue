import { initTRPC } from '@trpc/server';
import _ from 'lodash';
import z from 'zod';

const reviews = _.times(100, (i) => ({
  nick: `cool-review-${i}`,
  name: `review ${i}`,
  description: `review ${i} description`,
  text: _.times(100, (j) => `<p>Text paragraph ${j} of review ${i}</p>`).join(''),
}));

const trpc = initTRPC.create();

export const routerTRPC = trpc.router({
  getReviews: trpc.procedure.query(() => {
    return { reviews: reviews.map((review) => _.pick(review, ['nick', 'name', 'description'])) };
  }),
  getReview: trpc.procedure
    .input(
      z.object({
        reviewNick: z.string(),
      })
    )
    .query(({ input }) => {
      const review = reviews.find((review) => review.nick === input.reviewNick);
      return { review: review || null };
    }),
});

export type AppRouter = typeof routerTRPC;
