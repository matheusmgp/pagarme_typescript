import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { PayableController } from '../controllers';
import { BaseRoutes } from './base.route';

export class PayableRoutes extends BaseRoutes {
  constructor() {
    super();
    this.registerRoutes();
  }

  override registerRoutes(): void {
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
