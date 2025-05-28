import { zUpdateReviewTrpcInput } from './input';
import { trpc } from '../../lib/trpc';

export const updateReviewTrpcRoute = trpc.procedure.input(zUpdateReviewTrpcInput).mutation(async ({ input, ctx }) => {
  if (!ctx.me) throw Error('UNAUTHORIZED');

  const { reviewId, ...reviewInput } = input;

  const review = await ctx.prisma.review.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (!review) throw Error('Review not found');

  if (review?.authorId !== ctx.me.id) throw Error("You can't edit this review");

  if (input.nick !== review.nick) {
    const exReview = await ctx.prisma.review.findUnique({
      where: {
        nick: input.nick,
      },
    });

    if (exReview) throw Error('Review with this nick already exists');
  }

  await ctx.prisma.review.update({
    where: {
      id: reviewId,
    },
    data: {
      ...reviewInput,
    },
  });

  return true;
});
