import { Controller, Post, Get, Param } from "@nestjs/common";
import { AccountService } from './account.service';
import { AccountEntity } from './account.entity';

@Controller("/users")
export class AccountController {
  constructor(
    private accountService: AccountService
  ) { }

  @Get("/:id")
  async getAccountById(@Param("id") id: number): Promise<AccountEntity> {
    return this.accountService.getAccountById(id);
  }
}