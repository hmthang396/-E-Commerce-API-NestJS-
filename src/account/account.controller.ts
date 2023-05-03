import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto, UpdateAccountDto } from './account.dto';
import { Response } from 'express';
import { plainToClass } from 'class-transformer';
import { AuthGuard } from 'src/auth/auth.guard';
import { AccountPosition } from './account.entity';
import { Roles } from 'src/role/roles.decorator';


@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService) { }

    @Get(':id')
    @Roles([AccountPosition.Administrator],null)
    async find(@Param("id") id: any, @Res() res: Response) {
        try {
            let result = await this.accountService.findById(+id);
            if (result) {
                return res.send(result);
            } else {
                return res.status(HttpStatus.NOT_FOUND).send({ "message": "The data to be get is not found or does not exist" });
            }
        } catch (error) {
            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    @Roles([AccountPosition.Administrator],"create")
    async create(@Body() createAccountDto: CreateAccountDto, @Res({ passthrough: true }) res: Response) {
        try {
            let filteData = plainToClass(CreateAccountDto, createAccountDto, { excludeExtraneousValues: true })
            let result = await this.accountService.save(filteData);
            res.send(result);
        } catch (error) {
            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    @Roles([AccountPosition.Administrator],"update")
    async update(@Param("id") id: any, @Body() updateAccountDto: UpdateAccountDto, @Res() res: Response) {
        try {
            let result = await this.accountService.update(+id, updateAccountDto);
            if (result) {
                return res.status(HttpStatus.OK).send(result);
            } else {
                return res.status(HttpStatus.BAD_REQUEST).send({ "message": "Invalid request parameters" })
            }
        } catch (error) {
            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    @Roles([AccountPosition.Administrator],"delete")
    async delete(@Param("id") id: any, @Res() res: Response) {
        try {
            let result = await this.accountService.delete(+id);
            if (result) {
                return res.status(HttpStatus.NO_CONTENT).send(null);
            } else {
                return res.status(HttpStatus.NOT_FOUND).send({ "message": "The data to be deleted is not found or does not exist" })
            }
        } catch (error) {
            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }
}
