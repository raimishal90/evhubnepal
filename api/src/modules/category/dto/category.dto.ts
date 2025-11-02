import { IsString, IsOptional, IsInt, IsEnum } from 'class-validator';
import { CategoryType } from 'generated/prisma';

export class CategoryDto {
  @IsString()
  name: string;

  @IsEnum(CategoryType)
  type: CategoryType;

  @IsOptional()
  @IsInt()
  imageId?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  shortDescription?: string;

  @IsOptional()
  @IsInt()
  parentId?: number;
}

export class PartialCategoryDto extends CategoryDto {}