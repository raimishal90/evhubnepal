import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/modules/prisma/prisma.service';
import { AbstractMetaService } from '@/common/services/abstract-meta.service';

@Injectable()
export class UserMetaService extends AbstractMetaService {
  protected db: PrismaService['userMeta'];

  protected metaKeys: string[];

  constructor(private readonly prismaService: PrismaService) {
    super();
    this.db = prismaService.userMeta;
    this.metaKeys = ['gender', 'age', 'nationality'];
  }
}
