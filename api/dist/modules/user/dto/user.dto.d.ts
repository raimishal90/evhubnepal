export declare class UserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    status: string;
    roleId: number;
    meta?: Record<string, string>;
}
declare const PartialUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<UserDto>>;
export declare class PartialUserDto extends PartialUserDto_base {
}
declare const LoginDto_base: import("@nestjs/mapped-types").MappedType<Pick<UserDto, "email" | "password">>;
export declare class LoginDto extends LoginDto_base {
}
export {};
