import { PrismaService } from '@/modules/prisma/prisma.service';
import { Media } from 'generated/prisma';
export declare class MediaService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<Media>;
    getById(id: number): Promise<Media | null>;
    get(userId?: number): Promise<Media[]>;
    update(where: {
        id: number;
        userId: number;
    }, data: Partial<Media>): Promise<Media | null>;
    delete(where: {
        id: number;
        userId: number;
    }): Promise<boolean>;
}
