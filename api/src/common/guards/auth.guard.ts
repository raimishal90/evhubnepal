import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@/common/decorators/public.decorator';
import { TokenService } from '@/common/services/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (!token || type !== 'Bearer') {
      throw new UnauthorizedException(
        'Authorization token missing or malformed',
      );
    }

    try {
      const payload = await this.tokenService.validate(token);

      // Add user data to the request so that all route handlers can have access to it.
      request.user = {
        ...payload,
        isAdmin: payload.roleId === 1, // Keep 1 as admin role ID, Later we need to fetch role from DB
      };
      return true;
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}
