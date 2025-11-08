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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordDto = exports.ForgotPasswordDto = exports.LoginDto = exports.PartialUserDto = exports.UserDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const class_validator_1 = require("class-validator");
class UserDto {
    email;
    password;
    firstName;
    lastName;
    status;
    roleId;
    meta;
}
exports.UserDto = UserDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UserDto.prototype, "roleId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UserDto.prototype, "meta", void 0);
class PartialUserDto extends (0, mapped_types_1.PartialType)(UserDto) {
}
exports.PartialUserDto = PartialUserDto;
class LoginDto extends (0, mapped_types_1.PickType)(UserDto, [
    'email',
    'password',
]) {
}
exports.LoginDto = LoginDto;
class ForgotPasswordDto {
    email;
}
exports.ForgotPasswordDto = ForgotPasswordDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ForgotPasswordDto.prototype, "email", void 0);
class ResetPasswordDto {
    token;
    password;
}
exports.ResetPasswordDto = ResetPasswordDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "token", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "password", void 0);
//# sourceMappingURL=user.dto.js.map