import cors from 'cors';
import express from 'express';
import { applyTrpcToExpressApp } from './lib/trpc';
import { trpcRouter } from './router';

const expressApp = express();
const PORT = 3000;

expressApp.use(cors());

applyTrpcToExpressApp(expressApp, trpcRouter);

expressApp.listen(PORT, () => {
  console.info(`Server is running on port http://localhost:${PORT}`);
});
