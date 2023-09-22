import { Express, json, urlencoded } from 'express';
import cors from 'cors';

export const setupMiddlewares = (app: Express): void => {
  app.disable('x-powered-by');
  app.use(urlencoded({ extended: true }));
  app.use(cors());
  app.use(json());
};
