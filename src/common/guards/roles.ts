import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ERROR_CODES } from '../../constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const rolesClass = this.reflector.get<string[]>('roles', context.getClass()) || [];
    const rolesMethod = this.reflector.get<string[]>('roles', context.getHandler()) || [];
    if (!rolesClass.length && !rolesMethod.length) {
      return true;
    }
    const allRoles = [...rolesClass, ...rolesMethod];
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    if (user) {
      const { record } = user;
      if (!!record && allRoles.includes(record.role)) {
        return true;
      }
    }
    throw new ForbiddenException(ERROR_CODES.PERMISSION_DENIED);
  }
}
