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
import { Icd20Module } from './modules/icd-20/icd-20.module';
import { InterventionModule } from './modules/intervention/intervention.module';
import { StudyLocationModule } from './modules/study-location/study-location.module';
import { SamplingMethodModule } from './modules/sampling-method/sampling-method.module';
import { StudyDesignModule } from './modules/study-design/study-design.module';
import { QualityOfLifeToolkitModule } from './modules/quality-of-life-toolkit/quality-of-life-toolkit.module';
import { DataCollectingMethodModule } from './modules/data-collecting-method/data-collecting-method.module';

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
    QualityOfLifeToolkitModule,
    DataCollectingMethodModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
