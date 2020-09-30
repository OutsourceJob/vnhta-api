import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlOrmConfig } from './datasource/mysql.config';
import { UserModule } from './modules/user/user.module';
import { UploadModule } from './modules/upload/upload.module';
import { AuthModule } from './modules/auth/auth.modules';

@Module({
  imports: [
    TypeOrmModule.forRoot(mysqlOrmConfig),
    UserModule,
    UploadModule,
    AuthModule
  ],
  controllers: [AppController],
})
export class AppModule { }
