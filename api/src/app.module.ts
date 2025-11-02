import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { PrismaModule } from '@/modules/prisma/prisma.module';
import { UserModule } from '@/modules/user/user.module';
import { UserMetaModule } from '@/modules/user-meta/user-meta.module';
import { VehicleModule } from '@/modules/vehicle/vehicle.module';
import { VehicleMetaModule } from '@/modules/vehicle-meta/vehicle-meta.module';
import { MediaModule } from '@/modules/media/media.module';
import { CategoryModule } from '@/modules/category/category.module';

import { AuthGuard } from '@/common/guards/auth.guard';
import { TokenService } from '@/common/services/token.service';
import { LogService } from '@/common/services/log.service';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    VehicleModule,
    VehicleMetaModule,
    UserMetaModule,
    MediaModule,
    CategoryModule,
    ConfigModule.forRoot({
      isGlobal: true, // makes it accessible in all modules without re-importing
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads', 'media'),
      serveRoot: '/uploads/media',
    }),
  ],
  controllers: [],
  providers: [
    TokenService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    LogService,
  ],
})
export class AppModule {}
