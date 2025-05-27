import { Express } from 'express';
import { Passport } from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AppContext } from './ctx';
import { env } from './env';

// middleware for passport
export const applyPassportToExpressApp = (expressApp: Express, ctx: AppContext): void => {
  const passport = new Passport();

  passport.use(
    new Strategy(
      {
        secretOrKey: env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      },
      (jwtPayLoad: string, done: any) => {
        ctx.prisma.user
          .findUnique({
            where: {
              id: jwtPayLoad,
            },
          })
          .then((user) => {
            if (!user) {
              done(null, false);
              return;
            }
            done(null, user);
          })
          .catch((err) => {
            done(err, false);
          });
      }
    )
  );

  expressApp.use((req, res, next) => {
    if (!req.headers.authorization) {
      next();
      return;
    }
    passport.authenticate('jwt', { session: false }, (...args: any[]) => {
      req.user = args[1] || undefined;
      next();
    })(req, res, next);
  });
};
