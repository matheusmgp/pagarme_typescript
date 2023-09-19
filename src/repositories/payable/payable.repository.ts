import { PayableEntity } from '../../entities/payable.entity';
import { IPayableRepository } from '../interfaces/payable-repository.interface';
import { PrismaService } from '../../services/prisma/prisma.service';
import { injectable } from 'tsyringe';
@injectable()
export class PayableRepository implements IPayableRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(payload: PayableEntity): Promise<any> {
    return await this.prismaService.payable.create({
      data: payload,
    });
  }
  async getAll(availability: string): Promise<any> {
    return await this.prismaService.payable.findMany({
      where: {
        availability,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }
  async getAllInfo(): Promise<any> {
    return await this.prismaService.payable.findMany({
      orderBy: {
        id: 'desc',
      },
    });
  }
}
