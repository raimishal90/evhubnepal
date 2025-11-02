"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.create = void 0;
const bcrypt = require("bcrypt");
const create = (password) => {
    return bcrypt.hash(password, 10);
};
exports.create = create;
const compare = (password, hash) => {
    return bcrypt.compare(password, hash);
};
exports.compare = compare;
//# sourceMappingURL=hash.util.js.map