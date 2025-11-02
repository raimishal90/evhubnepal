import { MediaService } from '@/modules/media/media.service';
import { MediaDto, PartialMediaDto } from '@/modules/media/dto/media.dto';
import { ApiResponse } from '@/common/types/api-response.interface';
import { LogService } from '@/common/services/log.service';
import { Media } from 'generated/prisma';
import { File } from 'multer';
export declare class MediaController {
    private readonly mediaService;
    private readonly logService;
    constructor(mediaService: MediaService, logService: LogService);
    get(userId?: number): Promise<ApiResponse<Media[]>>;
    findOne(id: number): Promise<ApiResponse<Media | null>>;
    create(file: File, payload: MediaDto, userId: number): Promise<ApiResponse<Media>>;
    update(id: number, payload: PartialMediaDto, userId: number): Promise<ApiResponse<Media>>;
    delete(id: number, userId: number): Promise<ApiResponse<{
        id: number;
    }>>;
}
