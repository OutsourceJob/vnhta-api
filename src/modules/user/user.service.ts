import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from './user.repository';
import * as path from "path";
import * as fs from "fs";
import { getConnection, AdvancedConsoleLogger } from "typeorm";
import * as _ from 'lodash';
import * as BBPromise from 'bluebird';
import { UserEntity } from './user.entity';
import { CreateUserDTO } from './user.dto';

@Injectable()
export class UserService {
  @InjectRepository(UserRepository) private userRepo: UserRepository

  async getUserById(id: number): Promise<UserEntity> {
    return await this.userRepo.findOne(id);
  }

  async createUser(data: CreateUserDTO) {
    return await this.userRepo.create(data).save()
  }
}