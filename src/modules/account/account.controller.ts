import { Controller, Post, Patch, Get, UseInterceptors, NotFoundException, Body, Param } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDTO, WriteAccountDTO, VerifyRegisterEmailDTO, SendPinDTO, UpdateAccountDTO } from './account.dto';
import { SerializerInterceptor } from '../../serialization/serializer.interceptor';
import * as _ from "lodash";
import { sendEmail } from "../../utils/sendEmail";

@Controller("/accounts")
@UseInterceptors(SerializerInterceptor)
export class AccountController {
  constructor(
    public service: AccountService
  ) { }

  @Post()
  createAccount(@Body() data: CreateAccountDTO) {
    return this.service.createAccount(data);
  }

  @Patch("/verify-email")
  verifyEmail(
    @Body() data: VerifyRegisterEmailDTO
  ) {
    return this.service.verifyRegisterEmail(data)
  }

  @Patch("/send-pin")
  sendPin(
    @Body() data: SendPinDTO
  ) {
    return this.service.sendPinViaEmail(data);
  }

  @Patch("/:accountId")
  updateAccount(
    @Param("accountId") accountId: number,
    @Body() data: UpdateAccountDTO
  ) {
    return this.service.updateAccount(accountId, data);
  }
}