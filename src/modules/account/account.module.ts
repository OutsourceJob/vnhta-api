import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRepository } from './account.repository';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountConsole } from './account.console';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountRepository])
  ],
  providers: [AccountService, AccountConsole],
  controllers: [AccountController]
})
export class AccountModule { }