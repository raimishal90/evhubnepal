import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  InternalServerErrorException,
} from '@nestjs/common';
import { CategoryService } from '@/modules/category/category.service';
import {
  CategoryDto,
  PartialCategoryDto,
} from '@/modules/category/dto/category.dto';
import { ApiResponse } from '@/common/types/api-response.interface';
import { Public } from '@/common/decorators/public.decorator';
import { IsAdmin } from '@/common/decorators/is-admin.decorator';
import { LogService } from '@/common/services/log.service';
import { LogAction } from '@/common/types/log.enum';
import { Category } from 'generated/prisma';
import { UserId } from '@/common/decorators/user.decorator';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly logService: LogService,
  ) {}

  @Public()
  @Get()
  async getAll(): Promise<ApiResponse<Category[]>> {
    const data = await this.categoryService.getAll();
    return {
      status: true,
      data,
      message: 'Fetched successfully.',
    };
  }

  @Public()
  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<Category | null>> {
    const data = await this.categoryService.getById(id);
    return {
      status: true,
      data,
      message: 'Fetched successfully.',
    };
  }

  @Post()
  async create(
    @Body() payload: CategoryDto,
    @IsAdmin() isAdmin: boolean,
    @UserId() userId: number,
  ): Promise<ApiResponse<Category>> {
    if (!isAdmin) throw new InternalServerErrorException('Forbidden');
    const data = await this.categoryService.create(payload);

    await this.logService.create({
      action: LogAction.CREATE,
      entity: 'Category',
      entityId: data.id,
      performedBy: userId,
      note: 'Category Created.',
    });

    return {
      status: true,
      data,
      message: 'Created successfully.',
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: PartialCategoryDto,
    @IsAdmin() isAdmin: boolean,
    @UserId() userId: number,
  ): Promise<ApiResponse<Category | null>> {
    if (!isAdmin) throw new InternalServerErrorException('Forbidden');
    const data = await this.categoryService.update(id, payload);

    await this.logService.create({
      action: LogAction.UPDATE,
      entity: 'Category',
      entityId: id,
      performedBy: userId,
      detail: JSON.stringify(payload),
      note: 'Category Updated.',
    });

    return {
      status: true,
      data,
      message: 'Updated successfully.',
    };
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @IsAdmin() isAdmin: boolean,
    @UserId() userId: number,
  ): Promise<ApiResponse<{ id: number }>> {
    if (!isAdmin) throw new InternalServerErrorException('Forbidden');
    const deleted = await this.categoryService.delete(id);

    await this.logService.create({
      action: LogAction.DELETE,
      entity: 'Category',
      entityId: id,
      performedBy: userId,
      note: 'Category Deleted.',
    });

    return {
      status: true,
      data: { id },
      message: 'Deleted successfully.',
    };
  }
}
