import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserController } from '@/modules/user/user.controller';
import { UserService } from '@/modules/user/user.service';
import { TokenService } from '@/common/services/token.service';
import { UserMetaService } from '@/modules/user-meta/user-meta.service';
import { LogService } from '@/common/services/log.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'defaultSecretKey',
      signOptions: { expiresIn: '1h' }, // Adjust the expiration time as needed
    }),

    JwtModule.registerAsync({
      global: true, // makes JWT service available globally
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('SIGNIN_EXPIRE_TIME'),
        },
      }),
    }),
  ],
  providers: [UserService, TokenService, UserMetaService, LogService],
  controllers: [UserController],
})
export class UserModule {}
