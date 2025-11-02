import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { LogService } from '@/common/services/log.service';

@Module({
  imports: [PrismaModule],
  controllers: [CategoryController],
  providers: [CategoryService, LogService],
  exports: [CategoryService],
})
export class CategoryModule {}