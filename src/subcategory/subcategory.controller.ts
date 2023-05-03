import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { Response } from "express";
import { SubCategoryService } from "./subcategory.service";
import { CreateSubCategoryDto, UpdateSubCategoryDto } from "./subcategory.dto";

@Controller('subcategory')
export class SubCategoryController {
    constructor(private subCategoryService: SubCategoryService) { }

    @Get(':id')
    async find(@Param("id") id: any, @Res() res: Response) {
        try {
            let result = await this.subCategoryService.findById(+id);
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
            let result = await this.subCategoryService.findAll();
            res.send(result);
        } catch (error) {
            console.log(error);
            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }


    @Post()
    async create(@Body() createSubCategory: CreateSubCategoryDto, @Res() res: Response) {
        try {
            let result = await this.subCategoryService.save(createSubCategory);
            res.send(result);
        } catch (error) {
            console.log(error);

            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    async update(@Param("id") id: number, @Body() updateSubCategoryDto: UpdateSubCategoryDto, @Res() res: Response) {
        try {
            let result = await this.subCategoryService.update(+id, updateSubCategoryDto);
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
            let result = await this.subCategoryService.delete(+id);
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