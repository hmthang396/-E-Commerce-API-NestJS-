import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto, UpdateTransactionDto } from './transaction.dto';
import { UtilsService } from 'src/order/order.utils';

@Controller('transaction')
export class TransactionController {
    constructor(
        private transactionService: TransactionService,
        private utilsService : UtilsService
    ) { }
    @Get(':id')
    async find(@Param("id") id: any, @Res() res: Response) {
        try {
            let result = await this.transactionService.findById(+id);
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
            let result = await this.transactionService.findAll();
            res.send(result);
        } catch (error) {
            console.log(error);
            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async create(@Body() CreateTransaction: CreateTransactionDto, @Res() res: Response) {
        try {
            let codeOrder: string = '';
            do {
                codeOrder = await this.utilsService.generatorCode(12);
                let orderFind = await this.transactionService.findByCode(codeOrder);
                let check: boolean = orderFind === null ? false : true;
                if (!check) break;
            } while (true)
            CreateTransaction.code = (codeOrder);
            let result = await this.transactionService.save(CreateTransaction);
            res.send(result);
        } catch (error) {
            console.log(error);

            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    async update(@Param("id") id: number, @Body() UpdateTransaction: UpdateTransactionDto, @Res() res: Response) {
        try {
            let result = await this.transactionService.update(+id, UpdateTransaction);
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
    async dalete(@Param("id") id: number, @Res() res: Response) {
        try {
            let result = await this.transactionService.delete(+id);
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
