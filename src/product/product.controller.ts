import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Res, Put, Delete } from '@nestjs/common';
import { Response } from 'express';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { ProductService } from './product.service';
import { ImageService } from 'src/image/image.service';
import { Roles } from 'src/role/roles.decorator';
import { AccountPosition } from 'src/account/account.entity';

@Controller('product')
export class ProductController {
    constructor(
        private productService: ProductService,
        private imageService: ImageService,
        ) { }

    @Get(':id')
    async find(@Param("id") id: any, @Res() res: Response) {
        try {
            let result = await this.productService.findById(+id);
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
            let result = await this.productService.findAll();
            res.send(result);
        } catch (error) {
            console.log(error);
            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    @Roles([AccountPosition.Administrator,AccountPosition.Manager],"create")
    async create(@Body() CreateProduct: CreateProductDto, @Res() res: Response) {
        try {
            let result = await this.productService.save(CreateProduct);
            res.send(result);
        } catch (error) {
            console.log(error);
            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    @Roles([AccountPosition.Administrator,AccountPosition.Manager],"update")
    async update(@Param("id") id: number, @Body() UpdateProduct: UpdateProductDto, @Res() res: Response) {
        try {
            let result = await this.productService.update(+id, UpdateProduct);
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
            let result = await this.productService.delete(+id);
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
