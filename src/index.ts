import 'reflect-metadata';
import 'dotenv/config';
import './shared/containers';
import express from 'express';
import { setupRoutes } from './application/routes';
import { setupMiddlewares } from './config/setup-middleware';

const app = express();
setupMiddlewares(app);
setupRoutes(app);
export default app;
