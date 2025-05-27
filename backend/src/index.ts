import cors from 'cors';
import express from 'express';
import { createAppContext } from './lib/ctx';
import { AppContext } from './lib/ctx';
import { env } from './lib/env';
import { applyPassportToExpressApp } from './lib/passport';
import { applyTrpcToExpressApp } from './lib/trpc';
import { trpcRouter } from './router';

void (async () => {
  let ctx: AppContext | null = null;
  try {
    ctx = createAppContext();
    const expressApp = express();
    const PORT = env.PORT;

    expressApp.use(cors());
    applyPassportToExpressApp(expressApp, ctx);
    await applyTrpcToExpressApp(expressApp, ctx, trpcRouter);

    expressApp.listen(PORT, () => {
      console.info(`Server is running on port http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error(error);
    await ctx?.stop();
  }
})();
