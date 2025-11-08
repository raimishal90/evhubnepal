import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { LogAction } from '@/common/types/log.enum';
@Injectable()
export class LogService {
  constructor(private prismaService: PrismaService) {}

  async create(params: {
    action: LogAction;
    entity: string;
    entityId: number;
    performedBy: number;
    note: string;
    detail?: string;
  }): Promise<boolean> {
    const log = await this.prismaService.log.create({
      data: {
        action: params.action,
        entity: params.entity,
        entityId: params.entityId,
        performedBy: params.performedBy,
        note: params.note,
        detail: params.detail,
      },
    });

    if (!log) {
      return false;
    }

    return true;
  }
}
