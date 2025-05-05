import { zCreateReviewTrpcInput } from './input';
import { trpc } from '../../lib/trpc';

export const createReviewTrpcRoute = trpc.procedure.input(zCreateReviewTrpcInput).mutation(async ({ input, ctx }) => {
  const exReview = await ctx.prisma.review.findUnique({
    where: {
      nick: input.nick,
    },
  });
  if (exReview) {
    throw Error('Review with this nick already exists');
  }
  await ctx.prisma.review.create({
    data: input,
  });

  return true;
});
