import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Response } from 'express';
import { createCommentDto, updateCommentDto } from './comment.dto';

@Controller('comment')
export class CommentController {
    constructor(private commentService: CommentService) { }

    @Get(':id')
    async find(@Param("id") id: any, @Res() res: Response) {
        try {
            let result = await this.commentService.findById(+id);
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
            let result = await this.commentService.findAll();
            res.send(result);
        } catch (error) {
            console.log(error);
            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async create(@Body() createComment: createCommentDto, @Res() res: Response) {
        try {
            let result = await this.commentService.save(createComment);
            res.send(result);
        } catch (error) {
            console.log(error);

            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    async update(@Param("id") id: number, @Body() updateComment: updateCommentDto, @Res() res: Response) {
        try {
            let result = await this.commentService.update(+id, updateComment);
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
            let result = await this.commentService.delete(+id);
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
