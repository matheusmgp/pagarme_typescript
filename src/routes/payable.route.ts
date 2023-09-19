import { PayableController } from '../controllers/payable/payable.controller';
import express, { Request, Response, Router } from 'express';
import { container } from 'tsyringe';

export class PayableRoutes {
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  protected registerRoutes(): void {
    this.router.get('/payable', this.getAll);
    this.router.get('/payable/info', this.getAllInfo);
  }

  private async getAll(req: Request, res: Response): Promise<void> {
    const controller = container.resolve(PayableController);
    await controller.getAll(req, res);
  }
  private async getAllInfo(req: Request, res: Response): Promise<void> {
    const controller = container.resolve(PayableController);
    await controller.getAllInfo(req, res);
  }
}
