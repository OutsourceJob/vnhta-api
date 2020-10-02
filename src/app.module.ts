import { PathologyModule } from './modules/pathology/pathology.module';
import { JournalController } from './modules/journal/journal.controller';
import { ArticleModule } from './modules/article/article.module';
import { AuthorModule } from './modules/author/author.module';
import { CollectionModule } from './modules/collection/collection.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlOrmConfig } from './datasource/mysql.config';
import { AccountModule } from './modules/account/account.module';
import { UploadModule } from './modules/upload/upload.module';
import { AuthModule } from './modules/auth/auth.modules';
import { JournalModule } from './modules/journal/journal.module';

@Module({
  imports: [
    PathologyModule,
    TypeOrmModule.forRoot(mysqlOrmConfig),
    ArticleModule,
    AuthorModule,
    CollectionModule,
    AccountModule,
    UploadModule,
    AuthModule,
    JournalModule
  ],
  controllers: [
    AppController
  ],
})
export class AppModule { }
