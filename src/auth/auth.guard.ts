import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AccountService } from "src/account/account.service";

import { SetMetadata } from '@nestjs/common';
import { Reflector } from "@nestjs/core";

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private accountService: AccountService,
        private reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            // 💡 See this condition
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException('No token provided', new HttpException('No token provided', HttpStatus.FORBIDDEN));
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.JWT_SECRET_ACCESSTOKEN
                }
            );
            //
            const account =await this.accountService.findByEmail(payload.email);
            if(account){
                request['user'] = account;
            }else{
                throw new UnauthorizedException('Unauthorized access', new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED));
            }
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            
        } catch {
            throw new UnauthorizedException('Unauthorized access', new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED));
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers["authorization"]?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}