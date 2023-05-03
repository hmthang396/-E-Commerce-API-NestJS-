import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { Response } from "express";
import { CategoryService } from "./category.service";
import { createCategoryDto, updateCategoryDto } from "./category.dto";
import { Roles } from "src/role/roles.decorator";
import { AccountPosition } from "src/account/account.entity";

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) { }

    @Get(':id')
    async findOneById(@Param("id") id: number, @Res() res: Response) {
        try {
            let result =await this.categoryService.findById(+id);
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
            let result =await this.categoryService.findAll();
            return res.send(result);
        } catch (error) {
            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    @Roles([AccountPosition.Administrator,AccountPosition.Manager],"create")
    async create(@Body() createCategoryDto: createCategoryDto, @Res() res: Response) {
        try {
            let result = await this.categoryService.save(createCategoryDto);
            return res.send(result);
        } catch (error) {
            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    @Roles([AccountPosition.Administrator,AccountPosition.Manager],"update")
    async update(@Param("id") id: number,@Body() updateCategoryDto: updateCategoryDto, @Res() res: Response) {
        try {
            let result = await this.categoryService.update(+id, updateCategoryDto);
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
            let result = await this.categoryService.delete(+id);
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