import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsEmail, IsOptional, MinLength } from 'class-validator';

export class UserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  status: string;

  @IsOptional()
  roleId: number;

  @IsOptional()
  meta?: Record<string, string>;
}

export class PartialUserDto extends PartialType(UserDto) {}

export class LoginDto extends PickType(UserDto, [
  'email',
  'password',
] as const) {}

export class ForgotPasswordDto {
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
