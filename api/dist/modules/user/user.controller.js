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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_dto_1 = require("./dto/user.dto");
const user_service_1 = require("./user.service");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const hash = require("../../common/utils/hash.util");
const user_dto_2 = require("./dto/user.dto");
const user_dto_3 = require("./dto/user.dto");
const token_service_1 = require("../../common/services/token.service");
const user_decorator_1 = require("../../common/decorators/user.decorator");
const log_service_1 = require("../../common/services/log.service");
const log_enum_1 = require("../../common/types/log.enum");
let UserController = class UserController {
    userService;
    tokenService;
    logService;
    constructor(userService, tokenService, logService) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.logService = logService;
    }
    async login(payload) {
        const { email, password } = payload;
        const user = await this.userService.getByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Account does not exist.');
        }
        const correctPassword = await hash.compare(password, user.password);
        if (!correctPassword) {
            throw new common_1.UnauthorizedException('User credentials are incorrect.');
        }
        const token = await this.tokenService.create(user);
        const { password: userPassword, ...userData } = user;
        return {
            status: true,
            message: 'Logged in successfully.',
            data: { token, user: userData },
        };
    }
    async get() {
        const data = await this.userService.get();
        return {
            status: true,
            data,
            message: 'Fetched successfully.',
        };
    }
    async create(payload) {
        const createUser = await this.userService.create({
            ...payload,
            password: await hash.create(payload.password),
        });
        if (createUser) {
            const { password: userPassword, ...user } = createUser;
            await this.logService.create({
                action: log_enum_1.LogAction.CREATE,
                entity: 'User',
                entityId: user.id,
                performedBy: user.id,
                note: 'User Created.',
            });
            return {
                status: true,
                data: { user },
                message: 'Account created successfully! Please log in to continue.',
            };
        }
        throw new common_1.InternalServerErrorException('Internal Server Error.');
    }
    async update(id, payload, userId) {
        if (id !== userId) {
            throw new common_1.ForbiddenException('You are not authorized to update this user.');
        }
        const data = await this.userService.update(id, payload);
        if (!data) {
            throw new common_1.InternalServerErrorException('Internal Server Error.');
        }
        await this.logService.create({
            action: log_enum_1.LogAction.UPDATE,
            entity: 'User',
            entityId: id,
            performedBy: userId,
            detail: JSON.stringify(payload),
            note: 'User Updated.',
        });
        const { password: userPassword, ...user } = data;
        return {
            status: true,
            data: user,
            message: 'Updated successfully.',
        };
    }
    async delete(id, userId) {
        await this.userService.delete(id);
        await this.logService.create({
            action: log_enum_1.LogAction.DELETE,
            entity: 'User',
            entityId: id,
            performedBy: userId,
            note: 'Soft deleted.',
        });
        return {
            status: true,
            data: { id },
            message: 'Deleted successfully',
        };
    }
};
exports.UserController = UserController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "get", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_2.UserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_dto_3.PartialUserDto, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, user_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        token_service_1.TokenService,
        log_service_1.LogService])
], UserController);
//# sourceMappingURL=user.controller.js.map