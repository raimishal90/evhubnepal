import { PrismaService } from '@/modules/prisma/prisma.service';
import { LogAction } from '@/common/types/log.enum';
export declare class LogService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(params: {
        action: LogAction;
        entity: string;
        entityId: number;
        performedBy: number;
        note: string;
        detail?: string;
    }): Promise<boolean>;
}
