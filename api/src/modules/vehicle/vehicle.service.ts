import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { VehicleDto, PartialVehicleDto } from './dto/vehicle.dto';
import { VehicleMetaService } from '@/modules/vehicle-meta/vehicle-meta.service';
import {
  NormalizedVehicle,
  VehicleWithRelation,
} from '@/modules/vehicle/types/vehicle.types';

@Injectable()
export class VehicleService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly vehicleMetaService: VehicleMetaService,
  ) {}

  private async getResponseObject(
    vehicle: VehicleWithRelation,
  ): Promise<NormalizedVehicle> {
    const meta = this.vehicleMetaService.transform(vehicle.meta);

    // Get featuredImage media
    let featuredImage: any = null;
    if (meta.featuredImage) {
      featuredImage = await this.prismaService.media.findUnique({
        where: { id: Number(meta.featuredImage), deletedAt: null },
      });
    }

    // Get galleries media
    let galleries: any[] = [];
    if (meta.galleries) {
      try {
        const galleryIds = Array.isArray(meta.galleries)
          ? meta.galleries
          : JSON.parse(meta.galleries);
        if (Array.isArray(galleryIds) && galleryIds.length > 0) {
          galleries = await this.prismaService.media.findMany({
            where: { id: { in: galleryIds.map(Number) }, deletedAt: null },
          });
        }
      } catch {
        galleries = [];
      }
    }

    return {
      ...vehicle,
      meta: {
        ...meta,
        featuredImage,
        galleries,
      },
      categories: vehicle.categories.map((vc) => ({
        ...vc.category,
      })),
    };
  }

  async getAll(userId?: number): Promise<NormalizedVehicle[]> {
    const where: any = { deletedAt: null };
    if (userId) {
      where.userId = userId;
    }

    const vehicles = await this.prismaService.vehicle.findMany({
      where,
      include: {
        meta: true,
        categories: {
          include: { category: { include: { image: true } } },
        },
      },
    });

    return await Promise.all(vehicles.map((v) => this.getResponseObject(v)));
  }

  async getById(id: number): Promise<NormalizedVehicle | null> {
    const vehicle = await this.prismaService.vehicle.findUnique({
      where: { id, deletedAt: null },
      include: {
        meta: true,
        categories: {
          include: { category: { include: { image: true } } },
        },
      },
    });

    if (!vehicle) return null;

    return await this.getResponseObject(vehicle);
  }

  async create(
    userId: number,
    payload: VehicleDto,
  ): Promise<NormalizedVehicle | null> {
    const { meta, categoryIds, ...data } = payload;
    const vehicle = await this.prismaService.vehicle.create({
      data: { userId, ...data },
    });

    // Assign categories
    if (categoryIds && categoryIds.length > 0) {
      await this.prismaService.vehicleCategory.createMany({
        data: categoryIds.map((categoryId) => ({
          vehicleId: vehicle.id,
          categoryId,
        })),
        skipDuplicates: true,
      });
    }

    if (meta) {
      await this.vehicleMetaService.create(vehicle.id, meta);
    }

    return await this.getById(vehicle.id);
  }

  async update(
    where: { id: number; userId: number },
    payload: PartialVehicleDto,
  ): Promise<NormalizedVehicle | null> {
    const { meta, categoryIds, ...data } = payload;

    await this.prismaService.vehicle.updateMany({
      where: {
        id: where.id,
        userId: where.userId,
        deletedAt: null,
      },
      data,
    });

    // Update categories
    if (categoryIds) {
      // Remove existing relations
      await this.prismaService.vehicleCategory.deleteMany({
        where: { vehicleId: where.id },
      });
      // Add new relations
      await this.prismaService.vehicleCategory.createMany({
        data: categoryIds.map((categoryId) => ({
          vehicleId: where.id,
          categoryId,
        })),
        skipDuplicates: true,
      });
    }

    if (meta) {
      await this.vehicleMetaService.update(where.id, meta);
    }

    return await this.getById(where.id);
  }

  async delete(id: number, softDelete: boolean = true): Promise<boolean> {
    if (softDelete) {
      const deleted = await this.prismaService.vehicle.updateMany({
        where: {
          id,
          deletedAt: null,
        },
        data: {
          deletedAt: new Date(),
        },
      });

      return deleted.count > 0;
    }

    await this.prismaService.vehicleMeta.deleteMany({
      where: {
        id,
      },
    });

    await this.prismaService.vehicle.delete({
      where: {
        id,
      },
    });

    return true;
  }
}
