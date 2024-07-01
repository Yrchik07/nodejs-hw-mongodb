import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import rootRouter from './routers/index.js';
import cookiesParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';

export const setupServer = () => {
  const app = express();
  const PORT = process.env.PORT;

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());
  app.use(cookiesParser());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello User!');
  });

app.use('/uploads', express.static(UPLOAD_DIR));

  app.use(rootRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
