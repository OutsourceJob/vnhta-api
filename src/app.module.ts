import { SerializerModule } from './serialization/serializer.module';
import { CollectionController } from './modules/collection/collection.controller';
import { CollectionModule } from './modules/collection/collection.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlOrmConfig } from './datasource/mysql.config';
import { AccountModule } from './modules/account/account.module';
import { UploadModule } from './modules/upload/upload.module';
import { AuthModule } from './modules/auth/auth.modules';

@Module({
  imports: [
    SerializerModule,
    CollectionModule,
    TypeOrmModule.forRoot(mysqlOrmConfig),
    AccountModule,
    UploadModule,
    AuthModule
  ],
  controllers: [
    CollectionController, AppController],
})
export class AppModule { }
