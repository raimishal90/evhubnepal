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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const user_meta_service_1 = require("../user-meta/user-meta.service");
let UserService = class UserService {
    prismaService;
    userMetaService;
    constructor(prismaService, userMetaService) {
        this.prismaService = prismaService;
        this.userMetaService = userMetaService;
    }
    async get() {
        const users = await this.prismaService.user.findMany({
            where: {
                deletedAt: null,
            },
            include: {
                meta: true,
                role: true,
            },
        });
        return users.map((user) => this.getResponseObject(user));
    }
    getResponseObject(user) {
        return {
            ...user,
            roleId: user.role.id,
            role: user.role.name,
            meta: this.userMetaService.transform(user.meta),
        };
    }
    async getWhere(where) {
        const user = await this.prismaService.user.findUnique({
            where: {
                ...where,
                deletedAt: null,
            },
            include: {
                meta: true,
                role: true,
            },
        });
        if (!user)
            return null;
        return this.getResponseObject(user);
    }
    async getByEmail(email) {
        return this.getWhere({ email });
    }
    async getById(id) {
        return this.getWhere({ id });
    }
    async create(payload, roleId = 1) {
        const { meta, ...data } = payload;
        const user = await this.prismaService.user.create({
            data: {
                ...data,
                roleId,
            },
        });
        if (meta) {
            await this.userMetaService.create(user.id, meta);
        }
        return await this.getById(user.id);
    }
    async update(id, payload) {
        const { meta, ...data } = payload;
        await this.prismaService.user.update({
            where: { id },
            data,
        });
        if (meta) {
            await this.userMetaService.update(id, meta);
        }
        return await this.getById(id);
    }
    async delete(id, softDelete = true) {
        if (softDelete) {
            await this.prismaService.user.update({
                where: { id },
                data: {
                    deletedAt: new Date(),
                },
            });
            return true;
        }
        await this.prismaService.userMeta.deleteMany({
            where: {
                id,
            },
        });
        await this.prismaService.user.delete({
            where: {
                id,
            },
        });
        return true;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_meta_service_1.UserMetaService])
], UserService);
//# sourceMappingURL=user.service.js.map