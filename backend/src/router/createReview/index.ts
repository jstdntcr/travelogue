import { z } from 'zod';
import { reviews } from '../../lib/reviews';
import { trpc } from '../../lib/trpc';

export const createReviewTrpcRoute = trpc.procedure
  .input(
    z.object({
      name: z.string().min(1, 'Name is required'),
      nick: z
        .string()
        .min(1)
        .regex(/^[a-z0-9-]+$/, 'Nick can only contain lowercase letters, numbers and dashes'),
      description: z.string().min(1, 'Description is required'),
      text: z.string().min(100, 'Text must be at least 100 characters'),
    })
  )
  .mutation(({ input }) => {
    reviews.unshift(input);
    return true;
  });
