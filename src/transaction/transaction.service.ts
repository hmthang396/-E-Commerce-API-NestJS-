import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto, InforTransactionDto, UpdateTransactionDto } from './transaction.dto';
import { classToPlain, plainToClass } from 'class-transformer';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>) { }

    async save(transaction: CreateTransactionDto): Promise<InforTransactionDto | null> {
        let transactionEntity = await this.transactionRepository.create(transaction);
        let transactionData = await this.transactionRepository.save(transactionEntity, { transaction: true })
        return plainToClass(InforTransactionDto, transactionData);
    }

    async findByCode(code: string): Promise<InforTransactionDto | null> {
        let transactionData = await this.transactionRepository.findOne({
            where: { code: code },
        })
        return plainToClass(InforTransactionDto, classToPlain(transactionData), { excludeExtraneousValues: true, })
    }

    async findById(id: number): Promise<InforTransactionDto | null> {
        let transactionData = await this.transactionRepository.findOne({
            where: { id: id },
            relations: ['order', 'product','color']
        })
        return plainToClass(InforTransactionDto, classToPlain(transactionData), { excludeExtraneousValues: true, })
        //return classToPlain(transactionData, { groups: ['details'] }) as InforTransactionDto;
    }

    async findAll(): Promise<InforTransactionDto[] | null> {
        let transactionData = await this.transactionRepository.find({
            relations: ['order', 'product','color']
        })
        return transactionData.map((like) => {
            return plainToClass(InforTransactionDto, classToPlain(like), { excludeExtraneousValues: true, })
        })

    }

    async update(id: number, transaction: UpdateTransactionDto): Promise<InforTransactionDto | null> {
        let transactionEntity = this.transactionRepository.create(transaction);
        let transactionData = await this.transactionRepository.update(+id, transactionEntity);
        if (transactionData.affected) {
            let like = await this.transactionRepository.findOneBy({ id: id });
            return plainToClass(InforTransactionDto, like, { excludeExtraneousValues: true });
        } else {
            return null;
        }
    }

    async delete(id: number): Promise<InforTransactionDto | boolean> {
        let transactionData = await this.transactionRepository.delete({ id: +id });
        if (transactionData.affected) {
            return true;
        } else {
            return false;
        }
    }
}
