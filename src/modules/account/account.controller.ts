import { Controller, Post, Get, Param, UseInterceptors } from "@nestjs/common";
import { AccountService } from './account.service';
import { AccountEntity } from './account.entity';
import { Crud } from "@nestjsx/crud";
import { AuthorEntity } from "../catalog/author/author.entity";
import { CreateAccountDTO } from './account.dto';
import { SerializerInterceptor } from '../../serialization/serializer.interceptor';

@Crud({
  model: {
    type: AccountEntity
  },
  dto: {
    create: CreateAccountDTO,
    // update: WriteAuthorDTO
  }
})
@Controller("/accounts")
@UseInterceptors(SerializerInterceptor)
export class AccountController {
  constructor(
    public service: AccountService
  ) { }

  // @Get("/:id")
  // async getAccountById(@Param("id") id: number): Promise<AccountEntity> {
  //   return this.accountService.getAccountById(id);
  // }
}