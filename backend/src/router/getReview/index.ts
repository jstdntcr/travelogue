import { z } from 'zod';
import { reviews } from '../../lib/reviews';
import { trpc } from '../../lib/trpc';

export const getReviewTrpcRoute = trpc.procedure
  .input(
    z.object({
      reviewNick: z.string(),
    })
  )
  .query(({ input }) => {
    const review = reviews.find((review) => review.nick === input.reviewNick);
    return { review: review || null };
  });
