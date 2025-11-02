import { CategoryType } from 'generated/prisma';
export declare class CategoryDto {
    name: string;
    type: CategoryType;
    imageId?: number;
    description?: string;
    shortDescription?: string;
    parentId?: number;
}
export declare class PartialCategoryDto extends CategoryDto {
}
