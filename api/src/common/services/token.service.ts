import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '@/common/types/jwt-payload.interface';
import { NormalizeUser } from '@/modules/user/type/user.type';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async create(payload: NormalizeUser): Promise<string> {
    return await this.jwtService.signAsync({
      id: payload.id,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      role: payload.role,
      roleId: payload.roleId,
      status: payload.status,
    });
  }

  async validate(token: string): Promise<JwtPayload> {
    return await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
  }
}
