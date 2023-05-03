import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { BrandService } from './brand.service';
import { Response } from 'express';
import { createBrandDto, updateBrandDto } from './brand.dto';
import { Roles } from 'src/role/roles.decorator';
import { AccountPosition } from 'src/account/account.entity';

@Controller('brand')
export class BrandController {
    constructor(private brandService: BrandService) { }

    @Get(':id')
    async findOneById(@Param("id") id: number, @Res() res: Response) {
        try {
            let result =await this.brandService.findById(+id);
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
            let result =await this.brandService.findAll();
            return res.send(result);
        } catch (error) {
            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    @Roles([AccountPosition.Administrator,AccountPosition.Manager],"create")
    async create(@Body() createBrandDto: createBrandDto, @Res() res: Response) {
        try {
            let result = await this.brandService.save(createBrandDto);
            return res.send(result);
        } catch (error) {
            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    @Roles([AccountPosition.Administrator,AccountPosition.Manager],"update")
    async update(@Param("id") id: number,@Body() updateBrandDto: updateBrandDto, @Res() res: Response) {
        try {
            let result = await this.brandService.update(+id, updateBrandDto);
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
            let result = await this.brandService.delete(+id);
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
