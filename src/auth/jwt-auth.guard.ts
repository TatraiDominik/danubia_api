// jwt-auth.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Public } from './public.decorator';  // Importáld a Public dekorátort

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const handler = context.getHandler();

  
    const isPublic = this.reflector.get<boolean>('isPublic', handler);
    if (isPublic) {
      return true;  
    }

    const method = request.method;
    if (['POST', 'PUT', 'DELETE'].includes(method)) {
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException('Token is missing');
      }

      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: this.configService.get<string>('jwtSecret'),
        });
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException('Invalid token');
      }
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
