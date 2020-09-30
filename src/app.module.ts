import { CollectionController } from './modules/collection/collection.controller';
import { CollectionModule } from './modules/collection/collection.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlOrmConfig } from './datasource/mysql.config';
import { UserModule } from './modules/user/user.module';
import { UploadModule } from './modules/upload/upload.module';
import { AuthModule } from './modules/auth/auth.modules';

@Module({
  imports: [
    CollectionModule,
    TypeOrmModule.forRoot(mysqlOrmConfig),
    UserModule,
    UploadModule,
    AuthModule
  ],
  controllers: [
    CollectionController, AppController],
})
export class AppModule { }
