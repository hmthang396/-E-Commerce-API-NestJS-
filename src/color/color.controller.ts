import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res} from '@nestjs/common';
import { ColorService } from './color.service';
import { Response } from 'express';
import { createColorDto, updateColorDto } from './color.dto';

@Controller('color')
export class ColorController {
    constructor(private colorService: ColorService) {
    }

    @Get(':id')
    async findOneById(@Param("id") id: number, @Res() res: Response) {
        try {
            let result = await this.colorService.findById(+id);
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
            let result = await this.colorService.findAll();
            return res.send(result);
        } catch (error) {
            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    
    async create(@Body() createColor: createColorDto, @Res() res: Response) {
        try {
            let result = await this.colorService.save(createColor);
            return res.send(result);
        } catch (error) {
            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    async update(@Param("id") id: number, @Body() updateColor: updateColorDto, @Res() res: Response) {
        try {
            let result = await this.colorService.update(+id, updateColor);
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
            let result = await this.colorService.delete(+id);
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
