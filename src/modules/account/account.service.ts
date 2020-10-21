import { Injectable, OnModuleInit, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import * as _ from 'lodash';
import { AccountEntity } from './account.entity';
import { CreateAccountDTO, VerifyRegisterEmail } from './account.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import * as gpc from "generate-pincode";

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
    const pin = gpc(4);

    _.assign(data, {
      pin,
      pinCreatedAt: new Date()
    })

    // send email

    return await this.repo.create(data).save()
  }

  async verifyRegisterEmail(data: VerifyRegisterEmail) {
    const { email, pin } = data;

    this.repo.findOne({ where: { email } })
      .then(account => {
        if (!account) throw new NotFoundException("Email Not Found")

        if (account.pin !== pin) throw new BadRequestException("Pin code is invalid")

        account.isActive = true
        return account.save()
      })
      .then(account => {
        return account;
      })
      .catch(err => {
        throw new InternalServerErrorException(err)
      })
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