import { Injectable } from '@nestjs/common';
import { Comment } from './comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InforCommentDto, createCommentDto, updateCommentDto } from './comment.dto';
import { classToPlain, plainToClass } from 'class-transformer';

@Injectable()
export class CommentService {

    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>) { }

    async save(comment: createCommentDto): Promise<InforCommentDto | null> {
        let commentEntity = await this.commentRepository.create(comment);
        let commentData = await this.commentRepository.save(commentEntity, { transaction: true })
        return plainToClass(InforCommentDto, commentData);
    }


    async findById(id: number): Promise<InforCommentDto | null> {
        let commentData = await this.commentRepository.findOne({
            where: {
                id: id
            },
            relations: ['customer', 'product', 'likes','likes.customer']
        })
        return plainToClass(InforCommentDto, classToPlain(commentData), { excludeExtraneousValues: true, })
        //return classToPlain(commentData, { groups: ['details'] }) as InforCommentDto;
    }

    async findAll(): Promise<InforCommentDto[] | null> {
        let commentData = await this.commentRepository.find({
            relations: ['customer', 'product', 'likes','likes.customer']
        })
        return commentData.map((comment) => {
            return plainToClass(InforCommentDto, classToPlain(comment), { excludeExtraneousValues: true, })
        })

    }

    async update(id: number, comment: updateCommentDto): Promise<InforCommentDto | null> {
        let commentEntity = this.commentRepository.create(comment);
        let commentData = await this.commentRepository.update(+id, commentEntity);
        if (commentData.affected) {
            let comment = await this.commentRepository.findOneBy({ id: id });
            return plainToClass(InforCommentDto, comment, { excludeExtraneousValues: true });
        } else {
            return null;
        }
    }

    async delete(id: number): Promise<InforCommentDto | boolean> {
        let commentData = await this.commentRepository.delete({ id: +id });
        if (commentData.affected) {
            return true;
        } else {
            return false;
        }
    }
}
