import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import * as _ from 'lodash';
import { AccountEntity } from './account.entity';
import { CreateAccountDTO } from './account.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";

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

  async updatePassword(password: String): Promise<String> {
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      return hash;
    }

    return null;
  }
}