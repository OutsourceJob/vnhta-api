import { Console, Command } from "nestjs-console";
import { AccountService } from './account.service';
import commander = require("commander");

@Console()
export class AccountConsole {
  constructor(
    private accountService: AccountService
  ) { }

  @Command({
    command: "create-account <email> <password>"
  })
  async createAccount(email: string, password: string) {
    // await this.accountService.createAccount({ email, password })
  }
}