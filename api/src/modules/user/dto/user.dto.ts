import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

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
