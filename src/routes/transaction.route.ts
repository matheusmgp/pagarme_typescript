import { createTransactionSchema } from '../validators/create-transaction.validator';
import { TransactionController } from '../controllers/transaction/transaction.controller';
import express, { Request, Response, Router } from 'express';
import { container } from 'tsyringe';

export class TransactionRoutes {
  public router: Router;

  constructor() {
    this.router = express.Router();
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
