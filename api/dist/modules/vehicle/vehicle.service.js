"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const vehicle_meta_service_1 = require("../vehicle-meta/vehicle-meta.service");
let VehicleService = class VehicleService {
    prismaService;
    vehicleMetaService;
    constructor(prismaService, vehicleMetaService) {
        this.prismaService = prismaService;
        this.vehicleMetaService = vehicleMetaService;
    }
    async getResponseObject(vehicle) {
        const meta = this.vehicleMetaService.transform(vehicle.meta);
        let featuredImage = null;
        if (meta.featuredImage) {
            featuredImage = await this.prismaService.media.findUnique({
                where: { id: Number(meta.featuredImage), deletedAt: null },
            });
        }
        let galleries = [];
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
            }
            catch {
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
    async getAll(userId) {
        const where = { deletedAt: null };
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
    async getById(id) {
        const vehicle = await this.prismaService.vehicle.findUnique({
            where: { id, deletedAt: null },
            include: {
                meta: true,
                categories: {
                    include: { category: { include: { image: true } } },
                },
            },
        });
        if (!vehicle)
            return null;
        return await this.getResponseObject(vehicle);
    }
    async create(userId, payload) {
        const { meta, categoryIds, ...data } = payload;
        const vehicle = await this.prismaService.vehicle.create({
            data: { userId, ...data },
        });
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
    async update(where, payload) {
        const { meta, categoryIds, ...data } = payload;
        await this.prismaService.vehicle.updateMany({
            where: {
                id: where.id,
                userId: where.userId,
                deletedAt: null,
            },
            data,
        });
        if (categoryIds) {
            await this.prismaService.vehicleCategory.deleteMany({
                where: { vehicleId: where.id },
            });
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
    async delete(id, softDelete = true) {
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
};
exports.VehicleService = VehicleService;
exports.VehicleService = VehicleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        vehicle_meta_service_1.VehicleMetaService])
], VehicleService);
//# sourceMappingURL=vehicle.service.js.map