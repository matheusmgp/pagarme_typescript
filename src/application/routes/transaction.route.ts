import { createTransactionSchema } from '../validators';
import { Request, Response, Router } from 'express';
import { container } from 'tsyringe';
import { TransactionController } from '../controllers';

export class TransactionRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  protected registerRoutes(): void {
    this.router.get('/transaction', this.getAll);
    this.router.post('/transaction', createTransactionSchema, this.create);
  }

  private async getAll(req: Request, res: Response): Promise<void> {
    const controller = container.resolve(TransactionController);
    await controller.getAll(req, res);
  }
  private async create(req: Request, res: Response): Promise<void> {
    const controller = container.resolve(TransactionController);
    await controller.create(req, res);
  }
}