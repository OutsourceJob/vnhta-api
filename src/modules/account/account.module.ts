import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountConsole } from './account.console';
import { AccountEntity } from './account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity])
  ],
  providers: [AccountService, AccountConsole],
  controllers: [AccountController],
  exports: [AccountService]
})
export class AccountModule { }