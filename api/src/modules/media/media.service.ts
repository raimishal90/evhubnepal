import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { Media } from 'generated/prisma';

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {}

  async create(data): Promise<Media> {
    return this.prisma.media.create({ data });
  }

  async getById(id: number): Promise<Media | null> {
    return this.prisma.media.findUnique({
      where: { id },
    });
  }

  async get(userId?: number): Promise<Media[]> {
    const where: any = { deletedAt: null };
    if (userId) {
      where.userId = userId;
    }

    return this.prisma.media.findMany({ where });
  }

  async update(
    where: { id: number; userId: number },
    data: Partial<Media>,
  ): Promise<Media | null> {
    const updated = await this.prisma.media.updateMany({
      where,
      data,
    });

    if (updated.count === 0) return null;

    return this.getById(where.id);
  }

  async delete(where: { id: number; userId: number }): Promise<boolean> {
    const deleted = await this.prisma.media.updateMany({
      where: {
        id: where.id,
        userId: where.userId,
        deletedAt: null,
      },
      data: { deletedAt: new Date() },
    });

    return deleted.count > 0;
  }
}
