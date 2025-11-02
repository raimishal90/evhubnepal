import { CategoryService } from '@/modules/category/category.service';
import { CategoryDto, PartialCategoryDto } from '@/modules/category/dto/category.dto';
import { ApiResponse } from '@/common/types/api-response.interface';
import { LogService } from '@/common/services/log.service';
import { Category } from 'generated/prisma';
export declare class CategoryController {
    private readonly categoryService;
    private readonly logService;
    constructor(categoryService: CategoryService, logService: LogService);
    getAll(): Promise<ApiResponse<Category[]>>;
    getById(id: number): Promise<ApiResponse<Category | null>>;
    create(payload: CategoryDto, isAdmin: boolean, userId: number): Promise<ApiResponse<Category>>;
    update(id: number, payload: PartialCategoryDto, isAdmin: boolean, userId: number): Promise<ApiResponse<Category | null>>;
    delete(id: number, isAdmin: boolean, userId: number): Promise<ApiResponse<{
        id: number;
    }>>;
}
