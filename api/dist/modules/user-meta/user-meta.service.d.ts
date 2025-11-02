import { PrismaService } from '@/modules/prisma/prisma.service';
import { AbstractMetaService } from '@/common/services/abstract-meta.service';
export declare class UserMetaService extends AbstractMetaService {
    private readonly prismaService;
    protected db: PrismaService['userMeta'];
    protected metaKeys: string[];
    constructor(prismaService: PrismaService);
}
