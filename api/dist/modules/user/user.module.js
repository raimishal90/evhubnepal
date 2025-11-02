"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const token_service_1 = require("../../common/services/token.service");
const user_meta_service_1 = require("../user-meta/user-meta.service");
const log_service_1 = require("../../common/services/log.service");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET || 'defaultSecretKey',
                signOptions: { expiresIn: '1h' },
            }),
            jwt_1.JwtModule.registerAsync({
                global: true,
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: configService.get('SIGNIN_EXPIRE_TIME'),
                    },
                }),
            }),
        ],
        providers: [user_service_1.UserService, token_service_1.TokenService, user_meta_service_1.UserMetaService, log_service_1.LogService],
        controllers: [user_controller_1.UserController],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map