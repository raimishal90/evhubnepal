import { Module } from '@nestjs/common';
import { MediaService } from '@/modules/media/media.service';
import { MediaController } from '@/modules/media/media.controller';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { LogService } from '@/common/services/log.service';

@Module({
  imports: [PrismaModule],
  controllers: [MediaController],
  providers: [MediaService, LogService],
  exports: [MediaService],
})
export class MediaModule {}
