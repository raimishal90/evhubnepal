import { PrismaService } from '@/modules/prisma/prisma.service';
import { AbstractMetaService } from '@/common/services/abstract-meta.service';
export declare class VehicleMetaService extends AbstractMetaService {
    private readonly prismaService;
    protected db: PrismaService['vehicleMeta'];
    protected metaKeys: string[];
    constructor(prismaService: PrismaService);
}
