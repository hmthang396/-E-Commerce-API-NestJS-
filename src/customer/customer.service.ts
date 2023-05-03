import { Injectable } from '@nestjs/common';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto, InforCustomerDto, UpdateCustomerDto } from './customer.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>) { }

    async save(customer: CreateCustomerDto): Promise<InforCustomerDto | null> {
        let customerEntity = this.customerRepository.create(customer);
        let customerData = this.customerRepository.save(customerEntity, { transaction: true })
        return plainToClass(InforCustomerDto, customerData, { excludeExtraneousValues: true });
    }

    async findById(id: number): Promise<InforCustomerDto | null> {
        let customerData = await this.customerRepository.findOneBy({ id: id });
        return plainToClass(InforCustomerDto, customerData, { excludeExtraneousValues: true });
    }

    async update(id: number, customer: UpdateCustomerDto): Promise<InforCustomerDto | boolean> {
        let customerEntity = this.customerRepository.create(customer);
        let customerData = await this.customerRepository.update(id, customerEntity);
        if (customerData.affected) {
            let customer = await this.customerRepository.findOneBy({ id: id });
            return plainToClass(InforCustomerDto, customer, { excludeExtraneousValues: true });
        } else {
            return null;
        }
    }

    async delete(id: number): Promise<InforCustomerDto | boolean> {
        let customerData = await this.customerRepository.delete({ id: id });
        if (customerData.affected) {
            return true;
        } else {
            return false;
        }
    }
}
