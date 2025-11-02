import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsInt,
  IsIn,
  MaxLength,
  Min,
  MinLength,
  IsArray,
} from 'class-validator';

export class VehicleDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Min(0)
  regularPrice: number;

  @IsNumber()
  @Min(0)
  salePrice: number;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean = false;

  @IsOptional()
  @IsInt()
  parentId?: number = 0;

  @IsOptional()
  @IsString()
  @IsIn(['draft', 'published', 'archived']) // You can customize allowed statuses
  status?: string = 'draft';

  @IsOptional()
  meta?: Record<string, string>;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  categoryIds?: number[];
}

export class PartialVehicleDto extends PartialType(VehicleDto) {}
