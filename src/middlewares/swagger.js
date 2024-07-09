import createHttpError from 'http-errors';
import swaggerUi from 'swagger-ui-express';
import fs from 'node:fs';
import { SWAGGER_PATH } from '../constants/index.js';

export const swagger = () => {
  try {
    const swaggerDocument = JSON.parse(fs.readFileSync(SWAGGER_PATH));
    return [...swaggerUi.serve, swaggerUi.setup(swaggerDocument)];
  } catch (err) {
    return (req, res, next) => {
      console.log(err);
      next(createHttpError(500, "Can't load swagger docs"));
    };
  }
};
