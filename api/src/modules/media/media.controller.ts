import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MediaService } from '@/modules/media/media.service';
import { Public } from '@/common/decorators/public.decorator';
import { MediaDto, PartialMediaDto } from '@/modules/media/dto/media.dto';
import { UserId } from '@/common/decorators/user.decorator';
import { ApiResponse } from '@/common/types/api-response.interface';
import { LogService } from '@/common/services/log.service';
import { LogAction } from '@/common/types/log.enum';
import { Media } from 'generated/prisma';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, File } from 'multer';
import { extname } from 'path';

@Controller('media')
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
    private readonly logService: LogService,
  ) {}

  @Public()
  @Get()
  async get(@UserId() userId?: number): Promise<ApiResponse<Media[]>> {
    const data = await this.mediaService.get(userId);

    return {
      status: true,
      data,
      message: 'Fetched successfully.',
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<Media | null>> {
    const data = await this.mediaService.getById(id);
    return {
      status: true,
      data,
      message: 'Fetched successfully.',
    };
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/media',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async create(
    @UploadedFile() file: File,
    @Body() payload: MediaDto,
    @UserId() userId: number,
  ): Promise<ApiResponse<Media>> {
    if (!file) {
      throw new InternalServerErrorException('No file uploaded.');
    }

    const mediaData = {
      name: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      url: `/uploads/media/${file.filename}`,
      userId,
      caption: payload.caption ?? null,
      altText: payload.altText ?? null,
    };

    const data = await this.mediaService.create(mediaData);

    if (!data) {
      throw new InternalServerErrorException('Internal Server Error.');
    }

    await this.logService.create({
      action: LogAction.CREATE,
      entity: 'Media',
      entityId: data.id,
      performedBy: userId,
      note: 'Media Created.',
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
    @Body() payload: PartialMediaDto,
    @UserId() userId: number,
  ): Promise<ApiResponse<Media>> {
    const data = await this.mediaService.update({ id, userId }, payload);

    if (!data) {
      throw new InternalServerErrorException('Internal Server Error.');
    }

    await this.logService.create({
      action: LogAction.UPDATE,
      entity: 'Media',
      entityId: id,
      performedBy: userId,
      detail: JSON.stringify(payload),
      note: 'Media Updated.',
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
    @UserId() userId: number,
  ): Promise<ApiResponse<{ id: number }>> {
    const deleted = await this.mediaService.delete({ id, userId });

    if (!deleted) {
      throw new InternalServerErrorException('Internal Server Error.');
    }

    await this.logService.create({
      action: LogAction.DELETE,
      entity: 'Media',
      entityId: id,
      performedBy: userId,
      note: 'Soft deleted.',
    });

    return {
      status: true,
      data: { id },
      message: 'Deleted successfully.',
    };
  }
}
