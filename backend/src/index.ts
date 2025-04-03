import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { routerTRPC } from './trpc';

const expressApp = express();
const PORT = 8080;

expressApp.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: routerTRPC,
  })
);

expressApp.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
