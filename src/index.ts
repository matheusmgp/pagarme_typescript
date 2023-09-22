import 'reflect-metadata';
import 'dotenv/config';
import './shared/containers';
import express from 'express';
import { setupRoutes } from './routes';
import { setupMiddlewares } from './setup-middleware';

const app = express();
setupMiddlewares(app);
setupRoutes(app);
export default app;
