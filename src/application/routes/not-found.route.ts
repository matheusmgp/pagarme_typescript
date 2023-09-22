import { httpStatusCodes } from '../../shared/status-code';
import { ResponseProps, responseHttpException } from '../presenters/http-exception.presenter';
import { Request, Response, Router } from 'express';

export class NotFoundRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  protected registerRoutes(): void {
    this.router.use((req: Request, res: Response) => {
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
  }
}
