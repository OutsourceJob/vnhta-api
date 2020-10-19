import { Controller, Post, Get, Param, UseInterceptors, NotFoundException } from "@nestjs/common";
import { AccountService } from './account.service';
import { AccountEntity } from './account.entity';
import { Crud, Override, ParsedBody, ParsedRequest, CrudRequest, CrudController } from "@nestjsx/crud";
import { AuthorEntity } from "../catalog/author/author.entity";
import { CreateAccountDTO, WriteAccountDTO } from './account.dto';
import { SerializerInterceptor } from '../../serialization/serializer.interceptor';
import * as _ from "lodash";

@Crud({
  model: {
    type: AccountEntity
  },
  dto: {
    create: CreateAccountDTO,
    update: WriteAccountDTO
  }
})
@Controller("/accounts")
@UseInterceptors(SerializerInterceptor)
export class AccountController {
  constructor(
    public service: AccountService
  ) { }

  get base(): CrudController<AccountEntity> {
    return this;
  }

  // @Get("/:id")
  // async getAccountById(@Param("id") id: number): Promise<AccountEntity> {
  //   return this.accountService.getAccountById(id);
  // }

  @Override()
  async updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: any) {
    if (_.isEmpty(dto)) throw new NotFoundException({}, "Not found updated data!");

    let newDto = { ...dto };
    const password = _.get(newDto, "password", "");

    if (password) {
      const newPassword = await this.service.updatePassword(password);

      if (newPassword) newDto = { ...newDto, password: newPassword };
    };

    return this.base.updateOneBase(req, newDto);
  }
}