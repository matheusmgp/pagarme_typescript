import 'reflect-metadata';
import 'dotenv/config';
import './shared/containers';
import express from 'express';
const app = express();
import { router } from './routes';

app.disable('x-powered-by');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/v1/dev/', router);

export default app;
