import { zSignInTrpcInput } from './input';
import { trpc } from '../../lib/trpc';
import { getPasswordHash } from '../../utils/getPasswordHash';
import { signJWT } from '../../utils/signJWT';

export const signInTrpcRoute = trpc.procedure.input(zSignInTrpcInput).mutation(async ({ input, ctx }) => {
  const user = await ctx.prisma.user.findFirst({
    where: {
      nick: input.nick,
      password: getPasswordHash(input.password),
    },
  });

  if (!user) {
    throw new Error('No user with this nick and password');
  }

  const token = signJWT(user.id);

  return { token };
});
