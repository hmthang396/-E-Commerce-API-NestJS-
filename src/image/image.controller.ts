import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ImageService } from './image.service';
import { Request, Response } from "express";
import { createImageDto, updateImageDto } from "./image.dto";
import * as admin from 'firebase-admin';
import { Bucket } from '@google-cloud/storage';
import { FilesInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { FirebaseService } from "src/storage/firebase.service";

@Controller('image')
export class ImageController {
    constructor(private imageService: ImageService,private firebaseService: FirebaseService) {
    }

    @Get(':id')
    async findOneById(@Param("id") id: number, @Res() res: Response) {
        try {
            let result = await this.imageService.findById(+id);
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
            let result = await this.imageService.findAll();
            return res.send(result);
        } catch (error) {
            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    async create(@UploadedFiles() files: Express.Multer.File[], @Body() body: any, @Req() req: Request, @Res() res: Response) {
        try {
            const results = await this.firebaseService.upload(files);
            let createImage = results.map((e) => {
                return {
                    alt: body.alt,
                    src: e.status === "fulfilled" ? e.value.url[0] : null,
                    color: {
                        id: body.colorId
                    }
                } as createImageDto
            });
            let result = await this.imageService.save(createImage);
            return res.send(result);
        } catch (error) {
            console.log(error);

            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    async update(@Param("id") id: number, @Body() updateImage: updateImageDto, @Res() res: Response) {
        try {
            let result = await this.imageService.update(+id, updateImage);
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
            let result = await this.imageService.delete(+id);
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
