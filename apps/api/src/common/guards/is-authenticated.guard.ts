import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Request,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class IsAuthenticated implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    // Extract token from header
    const authHeader = request.headers['authorization'];
    const [type, token] = authHeader?.split(' ') ?? [];

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Access token is missing or malformed.');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request['user'] = payload; // Attach payload to request
    } catch {
      throw new UnauthorizedException('Invalid or expired access token.');
    }

    return true;
  }
}
