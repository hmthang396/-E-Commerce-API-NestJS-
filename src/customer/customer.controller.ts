import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Response } from 'express';
import { CreateCustomerDto, UpdateCustomerDto } from './customer.dto';
import { plainToClass } from 'class-transformer';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) { }

    @Get(':id')
    async find(@Param("id") id: any, @Res() res: Response) {
        try {
            let result = await this.customerService.findById(+id);
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
    async create(@Body() CreateCustomer: CreateCustomerDto, @Res({ passthrough: true }) res: Response) {
        try {
            let filteData = plainToClass(CreateCustomerDto, CreateCustomer, { excludeExtraneousValues: true })
            let result = await this.customerService.save(filteData);
            res.send(result);
        } catch (error) {
            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    async update(@Param("id") id: any, @Body() UpdateCustomer: UpdateCustomerDto, @Res() res: Response) {
        try {
            let result = await this.customerService.update(+id, UpdateCustomer);
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
    async delete(@Param("id") id: any, @Res() res: Response) {
        try {
            let result = await this.customerService.delete(+id);
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
