import { Console, Command } from "nestjs-console";
import { UserService } from './user.service';
import commander = require("commander");

@Console()
export class UserConsole {
  constructor(
    private userService: UserService
  ) { }

  @Command({
    command: "create-user <email> <password>"
  })
  async createUser(email: string, password: string) {
    await this.userService.createUser({ email, password })
    console.log("Success")
  }
}