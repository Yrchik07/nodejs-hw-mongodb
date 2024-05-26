import express from 'express';
import pino from 'pino-http';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT;

export const setupServer = () => {
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());

  app.use((req, res, next) => {
    console.log(new Date().toISOString());
    next();
  });

  app.get('/', (req, res, next) => {
    res.send('Hello World!');
  });

  app.get('/error', (req, res, next) => {
    next(new Error('some error here'));
  });

  app.use((reg, res) => {
    res.status(404).send({ message: 'Not found' });
  })

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// {
//     message: 'Not found',
//   }
