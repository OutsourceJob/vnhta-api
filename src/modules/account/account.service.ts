import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { AccountRepository } from './account.repository';
import * as _ from 'lodash';
import { AccountEntity } from './account.entity';
import { CreateAccountDTO } from './account.dto';

@Injectable()
export class AccountService {
  @InjectRepository(AccountRepository) private accountRepo: AccountRepository

  async getAccountById(id: number): Promise<AccountEntity> {
    return await this.accountRepo.findOne(id);
  }

  async createAccount(data: CreateAccountDTO) {
    return await this.accountRepo.create(data).save()
  }
}