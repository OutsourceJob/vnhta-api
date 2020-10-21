import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountConsole } from './account.console';
import { AccountEntity } from './account.entity';
import { EmailModule } from "../email/email.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity]),
    EmailModule
  ],
  providers: [AccountService, AccountConsole],
  controllers: [AccountController],
  exports: [AccountService]
})
export class AccountModule { }