import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import * as _ from 'lodash';
import { AccountEntity } from './account.entity';
import { CreateAccountDTO } from './account.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService extends TypeOrmCrudService<AccountEntity> {
  constructor(
    @InjectRepository(AccountEntity) repo: Repository<AccountEntity>
  ) {
    super(repo)
  }

  async getAccountByEmail(email: string): Promise<AccountEntity> {
    return await this.repo.findOne({ email })
  }

  async getAccountById(id: number): Promise<AccountEntity> {
    return await this.repo.findOne(id);
  }

  async createAccount(data: CreateAccountDTO) {
    return await this.repo.create(data).save()
  }
}