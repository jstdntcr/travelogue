import { trpc } from '../../lib/trpc';

export const getReviewsTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const reviews = await ctx.prisma.review.findMany({
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return { reviews };
});
