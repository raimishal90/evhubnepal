import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/modules/prisma/prisma.service';
import { AbstractMetaService } from '@/common/services/abstract-meta.service';

@Injectable()
export class VehicleMetaService extends AbstractMetaService {
  protected db: PrismaService['vehicleMeta'];

  protected metaKeys: string[];

  constructor(private readonly prismaService: PrismaService) {
    super();
    this.db = prismaService.vehicleMeta;
    this.metaKeys = [
      'featuredImage',
      'galleries',
      'weight',
      'brand',
      'color',
      'mileage',
    ];
  }
}
