import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { AuthorModule } from '../catalog/author/author.module';
import { JournalModule } from '../catalog/journal/journal.module';
import { CostBenefitModule } from './cost-benefit/cost-benefit.module';
import { QualityOfLifeModule } from './quality-of-life/quality-of-life.module';
import { CostEffectivenessModule } from './cost-effectiveness/cost-effectiveness.module';
import { UploadModule } from '../upload/upload.module';
import { SearchService } from './search.service';
import { ArticleConsole } from './article.console';
import { ConsoleModule } from 'nestjs-console';

@Module({
    imports: [
        TypeOrmModule.forFeature([ArticleEntity]),
        UploadModule,

        // sub-article
        CostBenefitModule, QualityOfLifeModule,
        CostEffectivenessModule,

        // Catalog
        AuthorModule, JournalModule,
    ],
    controllers: [ArticleController],
    providers: [ArticleService, SearchService, ArticleConsole],
})
export class ArticleModule { }