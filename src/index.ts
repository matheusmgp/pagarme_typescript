import 'reflect-metadata';
import 'dotenv/config';
import './shared/containers';
import express from 'express';
const app = express();
import { router } from './routes';
import { ResponseProps, responseHttpException } from './presenters/http-exception.presenter';
import { httpStatusCodes } from './errors/status-code/http-status-code';

app.disable('x-powered-by');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/v1/dev/', router);

app.use((req, res) => {
  const props: ResponseProps = {
    res,
    name: 'NOTFOUND_ERROR',
    cause: 'route does not exists',
    statusCode: httpStatusCodes.NOT_FOUND,
    message: ['This route you are trying to access,does not exists.'],
    method: req.method,
  };
  responseHttpException(props);
});

export default app;
