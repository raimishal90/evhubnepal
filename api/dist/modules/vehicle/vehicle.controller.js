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
exports.VehicleController = void 0;
const common_1 = require("@nestjs/common");
const vehicle_service_1 = require("./vehicle.service");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const vehicle_dto_1 = require("./dto/vehicle.dto");
const user_decorator_1 = require("../../common/decorators/user.decorator");
const log_service_1 = require("../../common/services/log.service");
const log_enum_1 = require("../../common/types/log.enum");
let VehicleController = class VehicleController {
    vehicleService;
    logService;
    constructor(vehicleService, logService) {
        this.vehicleService = vehicleService;
        this.logService = logService;
    }
    async getALL(userId) {
        const data = await this.vehicleService.getAll(userId);
        return {
            status: true,
            data,
            message: 'Fetched successfully.',
        };
    }
    async create(payload, userId) {
        const data = await this.vehicleService.create(userId, payload);
        if (!data) {
            throw new common_1.InternalServerErrorException('Internal Server Error.');
        }
        await this.logService.create({
            action: log_enum_1.LogAction.CREATE,
            entity: 'Vehicle',
            entityId: data.id,
            performedBy: userId,
            detail: JSON.stringify(payload),
            note: 'Vehicle Created.',
        });
        return {
            status: true,
            data,
            message: 'Created successfully.',
        };
    }
    async update(id, payload, userId) {
        const data = await this.vehicleService.update({ id, userId }, payload);
        if (!data) {
            throw new common_1.InternalServerErrorException('Internal Server Error.');
        }
        await this.logService.create({
            action: log_enum_1.LogAction.UPDATE,
            entity: 'Vehicle',
            entityId: data.id,
            performedBy: userId,
            detail: JSON.stringify(payload),
            note: 'Vehicle Updated.',
        });
        return {
            status: true,
            data,
            message: 'Updated successfully.',
        };
    }
    async delete(id, userId) {
        await this.vehicleService.delete(id);
        await this.logService.create({
            action: log_enum_1.LogAction.DELETE,
            entity: 'Vehicle',
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
exports.VehicleController = VehicleController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "getALL", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vehicle_dto_1.VehicleDto, Number]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, vehicle_dto_1.PartialVehicleDto, Number]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, user_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "delete", null);
exports.VehicleController = VehicleController = __decorate([
    (0, common_1.Controller)('vehicle'),
    __metadata("design:paramtypes", [vehicle_service_1.VehicleService,
        log_service_1.LogService])
], VehicleController);
//# sourceMappingURL=vehicle.controller.js.map