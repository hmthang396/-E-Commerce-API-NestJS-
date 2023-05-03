import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './auth.dto';
import { plainToClass } from 'class-transformer';
@Injectable()
export class AuthService {
    constructor(
        private accountService: AccountService,
        private jwtService: JwtService
    ) { }

    async signIn(email: string, password: string): Promise<AuthDto | any> {
        const account = await this.accountService.findByEmail(email);
        if (account) {
            if (await bcrypt.compare(password, account.password)) {
                // TODO: Generate a JWT and return it here
                const payload = { email: account.email };
                let access_token = await this.jwtService.signAsync(payload, {
                    algorithm: "HS256",
                    secret: process.env.JWT_SECRET_ACCESSTOKEN,
                    privateKey: "",
                    expiresIn: '1h'
                });
                let refresh_token = await this.jwtService.signAsync(payload, {
                    algorithm: "HS512",
                    secret: process.env.JWT_SECRET_REFRESH,

                    privateKey: "",
                    expiresIn: '1h'
                });
                let result = plainToClass(AuthDto, account, { excludeExtraneousValues: true });
                result.access_token = access_token;
                result.refresh_token = refresh_token;
                return result;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}
