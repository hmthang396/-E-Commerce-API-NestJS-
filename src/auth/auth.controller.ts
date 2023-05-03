import { Body, Controller, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Public } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post()
    async create(@Body() body: any, @Res() res: Response) {
        try {
            let result = await this.authService.signIn(body.email, body.password);
            if (result) {
                res.send(result);
            } else {
                res.status(HttpStatus.UNAUTHORIZED).json({ "error": "Invalid username or password" });
            }

        } catch (error) {
            console.log(error);

            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
