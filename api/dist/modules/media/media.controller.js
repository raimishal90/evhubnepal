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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaController = void 0;
const common_1 = require("@nestjs/common");
const media_service_1 = require("./media.service");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const media_dto_1 = require("./dto/media.dto");
const user_decorator_1 = require("../../common/decorators/user.decorator");
const log_service_1 = require("../../common/services/log.service");
const log_enum_1 = require("../../common/types/log.enum");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
let MediaController = class MediaController {
    mediaService;
    logService;
    constructor(mediaService, logService) {
        this.mediaService = mediaService;
        this.logService = logService;
    }
    async get(userId) {
        const data = await this.mediaService.get(userId);
        return {
            status: true,
            data,
            message: 'Fetched successfully.',
        };
    }
    async findOne(id) {
        const data = await this.mediaService.getById(id);
        return {
            status: true,
            data,
            message: 'Fetched successfully.',
        };
    }
    async create(file, payload, userId) {
        if (!file) {
            throw new common_1.InternalServerErrorException('No file uploaded.');
        }
        const mediaData = {
            name: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            url: `/uploads/media/${file.filename}`,
            userId,
            caption: payload.caption ?? null,
            altText: payload.altText ?? null,
        };
        const data = await this.mediaService.create(mediaData);
        if (!data) {
            throw new common_1.InternalServerErrorException('Internal Server Error.');
        }
        await this.logService.create({
            action: log_enum_1.LogAction.CREATE,
            entity: 'Media',
            entityId: data.id,
            performedBy: userId,
            note: 'Media Created.',
        });
        return {
            status: true,
            data,
            message: 'Created successfully.',
        };
    }
    async update(id, payload, userId) {
        const data = await this.mediaService.update({ id, userId }, payload);
        if (!data) {
            throw new common_1.InternalServerErrorException('Internal Server Error.');
        }
        await this.logService.create({
            action: log_enum_1.LogAction.UPDATE,
            entity: 'Media',
            entityId: id,
            performedBy: userId,
            detail: JSON.stringify(payload),
            note: 'Media Updated.',
        });
        return {
            status: true,
            data,
            message: 'Updated successfully.',
        };
    }
    async delete(id, userId) {
        const deleted = await this.mediaService.delete({ id, userId });
        if (!deleted) {
            throw new common_1.InternalServerErrorException('Internal Server Error.');
        }
        await this.logService.create({
            action: log_enum_1.LogAction.DELETE,
            entity: 'Media',
            entityId: id,
            performedBy: userId,
            note: 'Soft deleted.',
        });
        return {
            status: true,
            data: { id },
            message: 'Deleted successfully.',
        };
    }
};
exports.MediaController = MediaController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "get", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/media',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + (0, path_1.extname)(file.originalname));
            },
        }),
        limits: { fileSize: 5 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof multer_1.File !== "undefined" && multer_1.File) === "function" ? _a : Object, media_dto_1.MediaDto, Number]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, media_dto_1.PartialMediaDto, Number]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, user_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "delete", null);
exports.MediaController = MediaController = __decorate([
    (0, common_1.Controller)('media'),
    __metadata("design:paramtypes", [media_service_1.MediaService,
        log_service_1.LogService])
], MediaController);
//# sourceMappingURL=media.controller.js.map