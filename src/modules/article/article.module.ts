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

@Module({
    imports: [
        TypeOrmModule.forFeature([ArticleEntity]),

        // sub-article
        CostBenefitModule, QualityOfLifeModule,
        CostEffectivenessModule,

        // Catalog
        AuthorModule, JournalModule,
    ],
    controllers: [ArticleController],
    providers: [ArticleService],
})
export class ArticleModule { }
