import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto, InforAccountDto, SignInAccountDto, UpdateAccountDto } from './account.dto';
import { Account } from './account.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>) { }

  async save(account: CreateAccountDto): Promise<InforAccountDto | null> {
    let accountEntity = this.accountRepository.create(account);
    let accountData = this.accountRepository.save(accountEntity, { transaction: true })
    return plainToClass(InforAccountDto, accountData, { excludeExtraneousValues: true });
  }

  async findById(id: number): Promise<InforAccountDto | null> {
    let accountData = await this.accountRepository.findOneBy({ id: id });
    return plainToClass(InforAccountDto, accountData, { excludeExtraneousValues: true });
  }

  async update(id: number, account: UpdateAccountDto): Promise<InforAccountDto | boolean> {
    let accountEntity = this.accountRepository.create(account);
    let accountData = await this.accountRepository.update(id, accountEntity);
    if (accountData.affected) {
      let account = await this.accountRepository.findOneBy({ id: id });
      return plainToClass(InforAccountDto, account, { excludeExtraneousValues: true });
    } else {
      return null;
    }
  }

  async delete(id: number): Promise<InforAccountDto | boolean> {
    let accountData = await this.accountRepository.delete({ id: id });
    if (accountData.affected) {
      return true;
    } else {
      return false;
    }
  }

  async findByEmail(email: string): Promise<SignInAccountDto | null> {
    let accountData = await this.accountRepository.findOneBy({ email: email });
    return plainToClass(SignInAccountDto, accountData, { excludeExtraneousValues: true });
  }
}
