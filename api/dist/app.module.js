"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const prisma_module_1 = require("./modules/prisma/prisma.module");
const user_module_1 = require("./modules/user/user.module");
const user_meta_module_1 = require("./modules/user-meta/user-meta.module");
const vehicle_module_1 = require("./modules/vehicle/vehicle.module");
const vehicle_meta_module_1 = require("./modules/vehicle-meta/vehicle-meta.module");
const media_module_1 = require("./modules/media/media.module");
const category_module_1 = require("./modules/category/category.module");
const auth_guard_1 = require("./common/guards/auth.guard");
const token_service_1 = require("./common/services/token.service");
const log_service_1 = require("./common/services/log.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            user_module_1.UserModule,
            vehicle_module_1.VehicleModule,
            vehicle_meta_module_1.VehicleMetaModule,
            user_meta_module_1.UserMetaModule,
            media_module_1.MediaModule,
            category_module_1.CategoryModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads', 'media'),
                serveRoot: '/uploads/media',
            }),
        ],
        controllers: [],
        providers: [
            token_service_1.TokenService,
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
            log_service_1.LogService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map