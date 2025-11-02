import { PrismaService } from '@/modules/prisma/prisma.service';
import { CategoryDto, PartialCategoryDto } from './dto/category.dto';
import { Category } from 'generated/prisma';
export declare class CategoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<Category[]>;
    getById(id: number): Promise<Category | null>;
    create(payload: CategoryDto): Promise<Category>;
    update(id: number, payload: PartialCategoryDto): Promise<Category | null>;
    delete(id: number): Promise<boolean>;
}
