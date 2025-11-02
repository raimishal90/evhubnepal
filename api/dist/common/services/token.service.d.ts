import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '@/common/types/jwt-payload.interface';
import { NormalizeUser } from '@/modules/user/type/user.type';
export declare class TokenService {
    private jwtService;
    private configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    create(payload: NormalizeUser): Promise<string>;
    validate(token: string): Promise<JwtPayload>;
}
