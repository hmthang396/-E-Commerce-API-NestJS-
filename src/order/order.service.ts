import { Injectable } from '@nestjs/common';
import { Order } from './order.entiry';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto, InforOrderDto, UpdateOrderDto } from './order.dto';
import { classToPlain, plainToClass } from 'class-transformer';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>) { }

    async save(order: CreateOrderDto): Promise<InforOrderDto | null> {
        let orderEntity = await this.orderRepository.create(order);
        let orderData = await this.orderRepository.save(orderEntity, { transaction: true })
        return plainToClass(InforOrderDto, orderData);
    }

    async findByCode(code: string): Promise<InforOrderDto | null> {
        let orderData = await this.orderRepository.findOne({
            where: { code: code },
            relations: ['customer']
        })
        return plainToClass(InforOrderDto, classToPlain(orderData), { excludeExtraneousValues: true, })
        //return classToPlain(orderData, { groups: ['details'] }) as InforOrderDto;
    }

    async findById(id: number): Promise<InforOrderDto | null> {
        let orderData = await this.orderRepository.findOne({
            where: { id: id },
            relations: ['customer']
        })
        return plainToClass(InforOrderDto, classToPlain(orderData), { excludeExtraneousValues: true, })
        //return classToPlain(orderData, { groups: ['details'] }) as InforOrderDto;
    }

    async findAll(): Promise<InforOrderDto[] | null> {
        let orderData = await this.orderRepository.find({
            relations: ['customer']
        })
        return orderData.map((like) => {
            return plainToClass(InforOrderDto, classToPlain(like), { excludeExtraneousValues: true, })
        })

    }

    async update(id: number, order: UpdateOrderDto): Promise<InforOrderDto | null> {
        let orderEntity = this.orderRepository.create(order);
        let orderData = await this.orderRepository.update(+id, orderEntity);
        if (orderData.affected) {
            let order = await this.orderRepository.findOneBy({ id: id });
            return plainToClass(InforOrderDto, order, { excludeExtraneousValues: true });
        } else {
            return null;
        }
    }

    async delete(id: number): Promise<InforOrderDto | boolean> {
        let orderData = await this.orderRepository.delete({ id: +id });
        if (orderData.affected) {
            return true;
        } else {
            return false;
        }
    }
}
