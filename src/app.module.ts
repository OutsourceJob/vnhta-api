import { PathologyModule } from './modules/catalog/pathology/pathology.module';
import { ArticleModule } from './modules/article/article.module';
import { AuthorModule } from './modules/catalog/author/author.module';
import { CollectionModule } from './modules/collection/collection.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlOrmConfig } from './datasource/mysql.config';
import { AccountModule } from './modules/account/account.module';
import { UploadModule } from './modules/upload/upload.module';
import { AuthModule } from './modules/auth/auth.modules';
import { JournalModule } from './modules/catalog/journal/journal.module';
import { Icd20Module } from './modules/catalog/icd-20/icd-20.module';
import { InterventionModule } from './modules/catalog/intervention/intervention.module';
import { StudyLocationModule } from './modules/catalog/study-location/study-location.module';
import { SamplingMethodModule } from './modules/catalog/sampling-method/sampling-method.module';
import { StudyDesignModule } from './modules/catalog/study-design/study-design.module';
import { DataCollectingMethodModule } from './modules/catalog/data-collecting-method/data-collecting-method.module';
import { CostTypeModule } from './modules/catalog/cost-type/cost-type.module';

@Module({
  imports: [
    // mysql
    TypeOrmModule.forRoot(mysqlOrmConfig),

    // article
    CollectionModule,
    ArticleModule,

    // Auth
    AuthModule,
    AccountModule,

    // Utils
    UploadModule,

    // catalog
    AuthorModule,
    JournalModule,
    PathologyModule,
    Icd20Module,
    InterventionModule,
    StudyLocationModule,
    SamplingMethodModule,
    StudyDesignModule,
    DataCollectingMethodModule,
    CostTypeModule
  ],
  controllers: [AppController],
})
export class AppModule { }
