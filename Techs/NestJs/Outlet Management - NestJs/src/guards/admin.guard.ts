import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    NotFoundException,
  } from '@nestjs/common';
import { role } from 'src/util/constant.util';
  
  export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      if (!request.user) {
        throw new NotFoundException('User is not found please Login');
      }
      const userRole = request.user.userRole;
      if (userRole !== role.ADMIN) {
        throw new ForbiddenException('You are not Admin');
      }
      return true;
    }
  }
  