import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenService } from '@/common/services/token.service';
export declare class AuthGuard implements CanActivate {
    private reflector;
    private tokenService;
    constructor(reflector: Reflector, tokenService: TokenService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
