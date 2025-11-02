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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("./category.service");
const category_dto_1 = require("./dto/category.dto");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const is_admin_decorator_1 = require("../../common/decorators/is-admin.decorator");
const log_service_1 = require("../../common/services/log.service");
const log_enum_1 = require("../../common/types/log.enum");
const user_decorator_1 = require("../../common/decorators/user.decorator");
let CategoryController = class CategoryController {
    categoryService;
    logService;
    constructor(categoryService, logService) {
        this.categoryService = categoryService;
        this.logService = logService;
    }
    async getAll() {
        const data = await this.categoryService.getAll();
        return {
            status: true,
            data,
            message: 'Fetched successfully.',
        };
    }
    async getById(id) {
        const data = await this.categoryService.getById(id);
        return {
            status: true,
            data,
            message: 'Fetched successfully.',
        };
    }
    async create(payload, isAdmin, userId) {
        if (!isAdmin)
            throw new common_1.InternalServerErrorException('Forbidden');
        const data = await this.categoryService.create(payload);
        await this.logService.create({
            action: log_enum_1.LogAction.CREATE,
            entity: 'Category',
            entityId: data.id,
            performedBy: userId,
            note: 'Category Created.',
        });
        return {
            status: true,
            data,
            message: 'Created successfully.',
        };
    }
    async update(id, payload, isAdmin, userId) {
        if (!isAdmin)
            throw new common_1.InternalServerErrorException('Forbidden');
        const data = await this.categoryService.update(id, payload);
        await this.logService.create({
            action: log_enum_1.LogAction.UPDATE,
            entity: 'Category',
            entityId: id,
            performedBy: userId,
            detail: JSON.stringify(payload),
            note: 'Category Updated.',
        });
        return {
            status: true,
            data,
            message: 'Updated successfully.',
        };
    }
    async delete(id, isAdmin, userId) {
        if (!isAdmin)
            throw new common_1.InternalServerErrorException('Forbidden');
        const deleted = await this.categoryService.delete(id);
        await this.logService.create({
            action: log_enum_1.LogAction.DELETE,
            entity: 'Category',
            entityId: id,
            performedBy: userId,
            note: 'Category Deleted.',
        });
        return {
            status: true,
            data: { id },
            message: 'Deleted successfully.',
        };
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, is_admin_decorator_1.IsAdmin)()),
    __param(2, (0, user_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.CategoryDto, Boolean, Number]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, is_admin_decorator_1.IsAdmin)()),
    __param(3, (0, user_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, category_dto_1.PartialCategoryDto, Boolean, Number]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, is_admin_decorator_1.IsAdmin)()),
    __param(2, (0, user_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean, Number]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "delete", null);
exports.CategoryController = CategoryController = __decorate([
    (0, common_1.Controller)('category'),
    __metadata("design:paramtypes", [category_service_1.CategoryService,
        log_service_1.LogService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map