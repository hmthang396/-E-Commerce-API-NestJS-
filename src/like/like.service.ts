import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { Repository } from 'typeorm';
import { CreateLikeDto, InforLikeDto, UpdateLikeDto } from './like.dto';
import { classToPlain, plainToClass } from 'class-transformer';

@Injectable()
export class LikeService {
    constructor(
        @InjectRepository(Like)
        private likeRepository: Repository<Like>) { }

    async save(like: CreateLikeDto): Promise<InforLikeDto | null> {
        let likeEntity = await this.likeRepository.create(like);
        let likeData = await this.likeRepository.save(likeEntity, { transaction: true })
        return plainToClass(InforLikeDto, likeData);
    }


    async findById(id: number): Promise<InforLikeDto | null> {
        let likeData = await this.likeRepository.findOne({
            where: { id: id },
            relations: ['customer', 'comment']
        })
        return plainToClass(InforLikeDto, classToPlain(likeData), { excludeExtraneousValues: true, })
        //return classToPlain(likeData, { groups: ['details'] }) as InforLikeDto;
    }

    async findAll(): Promise<InforLikeDto[] | null> {
        let likeData = await this.likeRepository.find({
            relations: ['customer', 'comment']
        })
        return likeData.map((like) => {
            return plainToClass(InforLikeDto, classToPlain(like), { excludeExtraneousValues: true, })
        })

    }

    async update(id: number, like: UpdateLikeDto): Promise<InforLikeDto | null> {
        let likeEntity = this.likeRepository.create(like);
        let likeData = await this.likeRepository.update(+id, likeEntity);
        if (likeData.affected) {
            let like = await this.likeRepository.findOneBy({ id: id });
            return plainToClass(InforLikeDto, like, { excludeExtraneousValues: true });
        } else {
            return null;
        }
    }

    async delete(id: number): Promise<InforLikeDto | boolean> {
        let likeData = await this.likeRepository.delete({ id: +id });
        if (likeData.affected) {
            return true;
        } else {
            return false;
        }
    }
}
