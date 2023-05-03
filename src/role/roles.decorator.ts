import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccountPosition } from 'src/account/account.entity';

export const ROLES_KEY = 'roles';
export const Roles = (roles: AccountPosition[], action: string) => SetMetadata(ROLES_KEY, { roles, action });

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<any>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const { user } = context.switchToHttp().getRequest();
        let checkRole = (requiredRoles?.roles) ? requiredRoles?.roles.some((role) => user.position === role) : true;
        let checkAction = (requiredRoles?.action) ? user[requiredRoles?.action] : true;
        if(checkRole && checkAction){
            return true;
        }else{
            throw new UnauthorizedException('Access Denied', new HttpException('Access Denied', HttpStatus.FORBIDDEN));
        }
    }
}