import { ArticleModule } from './modules/article/article.module';
import { AuthorModule } from './modules/author/author.module';
import { SerializerModule } from './serialization/serializer.module';
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
    TypeOrmModule.forRoot(mysqlOrmConfig),
    ArticleModule,
    AuthorModule,
    SerializerModule,
    CollectionModule,
    AccountModule,
    UploadModule,
    AuthModule,
  ],
  controllers: [
    AppController
  ],
})
export class AppModule { }
