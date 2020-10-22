import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import * as _ from 'lodash';
import { AccountEntity } from './account.entity';
import { CreateAccountDTO, VerifyRegisterEmailDTO, SendPinDTO, UpdateAccountDTO, UpdatePasswordDTO, ResetPasswordDTO } from './account.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import * as gpc from "generate-pincode";
import * as moment from "moment";
import { EmailService } from "../email/email.service";
import * as pwGenerator from "generate-password"

@Injectable()
export class AccountService extends TypeOrmCrudService<AccountEntity> {
  constructor(
    @InjectRepository(AccountEntity) repo: Repository<AccountEntity>,
    private emailService: EmailService
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
    const pin = _.toString(gpc(4));

    _.assign(data, {
      pin,
      pinCreatedAt: new Date()
    })

    return this.repo.create(data).save()
      .then(account => {
        return [
          account,
          this.emailService.sendConfirmRegisterEmail(account.email, account.pin)
        ]
      })
      .then(res => {
        const [account] = res;
        return account
      })
      .catch(err => {
        throw new InternalServerErrorException(err)
      })
  }

  async verifyRegisterEmail(data: VerifyRegisterEmailDTO) {
    const { email, pin } = data;

    return this.repo.findOne({ where: { email } })
      .then(account => {
        if (!account) throw new NotFoundException("Email Not Found")

        if (
          account.pin !== pin ||
          moment(account.pinCreatedAt).valueOf() + 30 * 60 * 1000 < moment().valueOf()
        ) throw new BadRequestException("Pin code is invalid or expired")

        account.isActive = true
        return account.save()
      })
      .then(account => {
        return {
          message: "Activate successfully"
        }
      })
      .catch(err => {
        throw new InternalServerErrorException(err)
      })
  }

  async sendPinViaEmail(data: SendPinDTO) {
    const { email } = data;
    return this.repo.findOne({ where: { email } })
      .then(account => {
        if (!account) throw new NotFoundException("Email Not Found")

        account.pin = _.toString(gpc(4))
        account.pinCreatedAt = new Date()
        return account.save()
      })
      .then(account => {
        this.emailService.sendPinViaEmail(account.email, account.pin)
        return {
          message: "New pin has been sent to email"
        }
      })
      .catch(err => {
        throw new InternalServerErrorException(err)
      })
  }

  async updateAccount(accountId: number, data: UpdateAccountDTO) {
    return this.repo.findOne(accountId)
      .then(account => {
        _.keys(data)
          .forEach(key => {
            account[key] = data[key];
          })

        return account.save()
      })
      .catch(err => {
        throw new InternalServerErrorException(err)
      })
  }

  async updatePassword(accountId: number, data: UpdatePasswordDTO): Promise<any> {
    let account: AccountEntity;
    return this.repo.findOne(accountId)
      .then(_account => {
        if (!_account) throw new NotFoundException("Account Not Found")
        account = _account;

        return bcrypt.compare(data.oldPassword, account.password)
      })
      .then(isMatched => {
        console.log("AccountService -> isMatched", isMatched)
        if (!isMatched) throw new BadRequestException("Wrong password")

        return bcrypt.genSalt(10)
      })
      .then(salt => {
        return bcrypt.hash(data.newPassword, salt)
      })
      .then(hash => {
        account.password = hash;
        return account.save()
      })
      .then(() => {
        return {
          message: "Update password successfully"
        }
      })
      .catch(err => {
        throw new InternalServerErrorException(err)
      })
  }

  async resetPassword(data: ResetPasswordDTO) {
    const { email } = data;
    let account: AccountEntity;
    let newPassword: string;
    return this.repo.findOne({ email })
      .then(_account => {
        if (!_account) throw new NotFoundException("Account Not Found")

        account = _account;

        return bcrypt.genSalt(10)
      })
      .then(salt => {
        newPassword = pwGenerator.generate({ length: 10, numbers: true })
        return bcrypt.hash(newPassword, salt)
      })
      .then(hash => {
        account.password = hash;
        return account.save()
      })
      .then(() => {
        this.emailService.resetPassword(email, newPassword);

        return {
          message: "New password has been sent to email"
        }
      })
      .catch(err => {
        throw new InternalServerErrorException(err)
      })
  }
}