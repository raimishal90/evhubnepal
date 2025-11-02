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
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MediaService = class MediaService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.media.create({ data });
    }
    async getById(id) {
        return this.prisma.media.findUnique({
            where: { id },
        });
    }
    async get(userId) {
        const where = { deletedAt: null };
        if (userId) {
            where.userId = userId;
        }
        return this.prisma.media.findMany({ where });
    }
    async update(where, data) {
        const updated = await this.prisma.media.updateMany({
            where,
            data,
        });
        if (updated.count === 0)
            return null;
        return this.getById(where.id);
    }
    async delete(where) {
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
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MediaService);
//# sourceMappingURL=media.service.js.map