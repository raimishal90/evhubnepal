"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractMetaService = void 0;
const common_1 = require("@nestjs/common");
let AbstractMetaService = class AbstractMetaService {
    async create(id, meta) {
        const entries = Object.entries(meta).filter(([key]) => this.metaKeys.includes(key));
        if (!entries.length)
            return;
        const result = await this.db.createMany({
            data: entries.map(([key, value]) => ({
                id: id,
                meta_key: key,
                meta_value: String(value),
            })),
            skipDuplicates: true,
        });
        return result;
    }
    transform(metaArray) {
        return metaArray.reduce((acc, item) => {
            acc[item.meta_key] = item.meta_value;
            return acc;
        }, {});
    }
    async update(id, meta) {
        const missing = [];
        const entries = Object.entries(meta).filter(([key]) => this.metaKeys.includes(key));
        for (const [key, value] of entries) {
            const result = await this.db.updateMany({
                where: { id, meta_key: key },
                data: { meta_value: String(value) },
            });
            if (result.count === 0) {
                missing.push({ key, value });
            }
        }
        if (missing.length) {
            await this.db.createMany({
                data: missing.map(({ key, value }) => ({
                    id,
                    meta_key: key,
                    meta_value: String(value),
                })),
                skipDuplicates: true,
            });
        }
    }
};
exports.AbstractMetaService = AbstractMetaService;
exports.AbstractMetaService = AbstractMetaService = __decorate([
    (0, common_1.Injectable)()
], AbstractMetaService);
//# sourceMappingURL=abstract-meta.service.js.map