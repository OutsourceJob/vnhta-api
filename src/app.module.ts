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
import { DataCollectingMethodModule } from './modules/catalog/data-collecting-method/data-collecting-method.module';
import { ComparatorModule } from "./modules/catalog/comparator/comparator.module";
import { DiscountRateModule } from './modules/catalog/discount-rate/discount-rate.module';
import { AnalysisMethodModule } from './modules/catalog/analysis-method/analysis-method.module';
import { UncertaintyAnalysisMethodModule } from './modules/catalog/uncertainty-analysis-method/uncertainty-analysis-method.module';
import { TableModule } from './modules/catalog/table/table.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { EffectivenessTypeModule } from './modules/catalog/effectiveness-type/effectiveness-type.module';

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
    DataCollectingMethodModule,
    ComparatorModule,
    DiscountRateModule,
    AnalysisMethodModule,
    UncertaintyAnalysisMethodModule,
    EffectivenessTypeModule,

    // table
    TableModule,

    // statistics
    StatisticsModule
  ],
  controllers: [AppController],
})
export class AppModule { }
