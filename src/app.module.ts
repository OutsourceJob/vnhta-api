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
import { CostComponentModule } from './modules/catalog/cost-component/cost-component.module';
import { StudyPerspectiveModule } from './modules/catalog/study-perspective/study-perspective.module';
import { SampleSizeModule } from './modules/catalog/sample-size/sample-size.module';
import { ComparatorModule } from "./modules/catalog/comparator/comparator.module";
import { ModelTypeModule } from "./modules/catalog/model-type/model-type.module";
import { EffectivenessDataCollectingMethodModule } from './modules/catalog/effectiveness-data-collecting-method/effectiveness-data-collecting-method.module';
import { DiscountRateModule } from './modules/catalog/discount-rate/discount-rate.module';
import { CurrencyUnitModule } from './modules/catalog/currency-unit/currency-unit.module';
import { AnalysisMethodModule } from './modules/catalog/analysis-method/analysis-method.module';
import { HeterogeneityAnalysisModule } from './modules/catalog/heterogeneity-analysis/heterogeneity-analysis.module';
import { UncertaintyAnalysisModule } from './modules/catalog/uncertainty-analysis/uncertainty-analysis.module';
import { UncertaintyAnalysisResultModule } from "./modules/catalog/uncertainty-analysis-result/uncertainty-analysis-result.module";

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
    CostTypeModule, CostComponentModule,
    StudyPerspectiveModule,
    SampleSizeModule,
    ModelTypeModule,
    ComparatorModule,
    EffectivenessDataCollectingMethodModule,
    DiscountRateModule,
    CurrencyUnitModule,
    AnalysisMethodModule,
    HeterogeneityAnalysisModule,
    UncertaintyAnalysisModule,
    UncertaintyAnalysisResultModule
  ],
  controllers: [AppController],
})
export class AppModule { }
