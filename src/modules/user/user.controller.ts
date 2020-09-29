import { Controller, Post, Get, Param } from "@nestjs/common";
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Controller("/users")
export class UserController {
  constructor(
    private userService: UserService
  ) { }

  @Get("/:id")
  async getUserById(@Param("id") id: number): Promise<UserEntity> {
    return this.userService.getUserById(id);
  }
}