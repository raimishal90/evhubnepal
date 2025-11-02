"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsAdmin = void 0;
const common_1 = require("@nestjs/common");
exports.IsAdmin = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.isAdmin === true;
});
//# sourceMappingURL=is-admin.decorator.js.map