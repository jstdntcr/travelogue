import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';
import { routerTRPC } from './trpc';

const expressApp = express();
const PORT = 3000;

expressApp.use(cors());

expressApp.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: routerTRPC,
  })
);

expressApp.listen(PORT, () => {
  console.info(`Server is running on port http://localhost:${PORT}`);
});
