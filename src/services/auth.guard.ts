import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthController } from '../controllers/auth.constroller';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthController) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { authorization } = context.switchToHttp().getRequest().headers;
    return this.authService.checkToken(authorization ?? '');
  }
}
