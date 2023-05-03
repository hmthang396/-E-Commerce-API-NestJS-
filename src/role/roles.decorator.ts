import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccountPosition } from 'src/account/account.entity';

export const ROLES_KEY = 'roles';
export const Roles = (roles: AccountPosition[],action : string) => SetMetadata(ROLES_KEY, {roles,action});

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<any>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log(requiredRoles);
        
        if (!requiredRoles?.roles && !requiredRoles.action) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some((role) => user.position?.includes(role));
    }
}