import { z } from 'zod';
import { trpc } from '../../lib/trpc';

export const getReviewTrpcRoute = trpc.procedure
  .input(
    z.object({
      reviewNick: z.string(),
    })
  )
  .query(async ({ input, ctx }) => {
    const review = await ctx.prisma.review.findUnique({
      where: {
        nick: input.reviewNick,
      },
      include: {
        author: {
          select: {
            id: true,
            nick: true,
          },
        },
      },
    });
    return { review };
  });
