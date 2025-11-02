"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const library_1 = require("../../../generated/prisma/runtime/library");
let AllExceptionsFilter = class AllExceptionsFilter {
    catch(e, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        console.log(e);
        let status = e instanceof common_1.HttpException
            ? e.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        if (e instanceof common_1.HttpException) {
            const res = e.getResponse();
            if (typeof res === 'object') {
                message = res.message || message;
            }
            else {
                message = res;
            }
        }
        if (e instanceof library_1.PrismaClientKnownRequestError) {
            switch (e.code) {
                case 'P2002':
                    status = common_1.HttpStatus.CONFLICT;
                    message = 'An account with this email address already exists.';
                    break;
                case 'P2003':
                    status = common_1.HttpStatus.BAD_REQUEST;
                    message = 'Invalid foreign key: referenced record does not exist.';
                    break;
                case 'P2025':
                    status = common_1.HttpStatus.NOT_FOUND;
                    message = 'The requested record was not found.';
                    break;
                default:
                    message = e.message;
                    break;
            }
        }
        response.status(status).json({
            code: status,
            status: false,
            data: null,
            message,
        });
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
//# sourceMappingURL=exception.filter.js.map