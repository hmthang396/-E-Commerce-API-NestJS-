import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { OrderService } from './order.service';
import { Response } from 'express';
import { CreateOrderDto, UpdateOrderDto } from './order.dto';
import { UtilsService } from './order.utils';
import { Customer } from 'src/customer/customer.entity';
import { Roles } from 'src/role/roles.decorator';
import { AccountPosition } from 'src/account/account.entity';

@Controller('order')
export class OrderController {
    constructor(
        private orderService: OrderService,
        private utils: UtilsService
    ) { }

    @Get(':id')
    async find(@Param("id") id: any, @Res() res: Response) {
        try {
            let result = await this.orderService.findById(+id);
            if (result) {
                return res.send(result);
            } else {
                return res.status(HttpStatus.NOT_FOUND).send({ "message": "The data to be get is not found or does not exist" });
            }
        } catch (error) {
            console.log(error);
            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('')
    async findAll(@Res() res: Response) {
        try {
            let result = await this.orderService.findAll();
            res.send(result);
        } catch (error) {
            console.log(error);
            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async create(@Body() body: any, @Res() res: Response) {
        try {
            let order: CreateOrderDto = new CreateOrderDto();
            let codeOrder: string = '';
            do {
                codeOrder = await this.utils.generatorCode(12);
                let orderFind = await this.orderService.findByCode(codeOrder);
                let check: boolean = orderFind === null ? false : true;
                if (!check) break;
            } while (true)
            order.code = (codeOrder);
            let result = await this.orderService.save(order);
            res.send(result);
        } catch (error) {
            console.log(error);

            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    async update(@Param("id") id: number, @Body() UpdateLike: UpdateOrderDto, @Res() res: Response) {
        try {
            let result = await this.orderService.update(+id, UpdateLike);
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
    @Roles([AccountPosition.Administrator,AccountPosition.Manager],"delete")
    async delete(@Param("id") id: number, @Res() res: Response) {
        try {
            let result = await this.orderService.delete(+id);
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
