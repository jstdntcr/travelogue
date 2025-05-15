import cors from 'cors';
import express from 'express';
import { createAppContext } from './lib/ctx';
import { AppContext } from './lib/ctx';
import { applyTrpcToExpressApp } from './lib/trpc';
import { trpcRouter } from './router';

void (async () => {
  let ctx: AppContext | null = null;
  try {
    ctx = createAppContext();
    const expressApp = express();
    const PORT = 3000;

    expressApp.use(cors());
    await applyTrpcToExpressApp(expressApp, ctx, trpcRouter);

    expressApp.listen(PORT, () => {
      console.info(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
    await ctx?.stop();
  }
})();
