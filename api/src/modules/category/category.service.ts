import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { CategoryDto, PartialCategoryDto } from './dto/category.dto';
import { Category } from 'generated/prisma';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Category[]> {
    return this.prisma.category.findMany({
      where: { deletedAt: null },
      include: { image: true },
    });
  }

  async getById(id: number): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: { id, deletedAt: null },
      include: { image: true },
    });
  }

  async create(payload: CategoryDto): Promise<Category> {
    return this.prisma.category.create({
      data: payload,
      include: { image: true },
    });
  }

  async update(
    id: number,
    payload: PartialCategoryDto,
  ): Promise<Category | null> {
    await this.prisma.category.updateMany({
      where: { id, deletedAt: null },
      data: payload,
    });
    return this.getById(id);
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await this.prisma.category.updateMany({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date() },
    });
    return deleted.count > 0;
  }
}
