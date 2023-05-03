import { Response } from 'express';
import { DiscountService } from './discount.service';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { createDiscountDto, updateDiscountDto } from './discount.dto';
import { Roles } from 'src/role/roles.decorator';
import { AccountPosition } from 'src/account/account.entity';
@Controller('discount')
export class DiscountController {
    constructor(private discountService: DiscountService) { }

    @Get(':id')
    async findOneById(@Param("id") id: number, @Res() res: Response) {
        try {
            let result =await this.discountService.findById(+id);
            if (result) {
                return res.send(result);
            } else {
                return res.status(HttpStatus.NOT_FOUND).send({ "message": "The data to be get is not found or does not exist" });
            }
        } catch (error) {
            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('')
    async findAll(@Res() res: Response) {
        try {
            let result =await this.discountService.findAll();
            return res.send(result);
        } catch (error) {
            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    @Roles([AccountPosition.Administrator],"create")
    async create(@Body() createDiscount: createDiscountDto, @Res() res: Response) {
        try {
            let result = await this.discountService.save(createDiscount);
            return res.send(result);
        } catch (error) {
            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    @Roles([AccountPosition.Administrator],"update")
    async update(@Param("id") id: number,@Body() updateDiscount: updateDiscountDto, @Res() res: Response) {
        try {
            let result = await this.discountService.update(+id, updateDiscount);
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
    async delete(@Param("id") id: number, @Res() res: Response) {
        try {
            let result = await this.discountService.delete(+id);
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
