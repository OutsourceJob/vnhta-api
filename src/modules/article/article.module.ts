import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { AuthorModule } from '../author/author.module';
import { JournalModule } from '../catalog/journal/journal.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ArticleEntity]),
        AuthorModule, JournalModule
    ],
    controllers: [ArticleController],
    providers: [ArticleService],
})
export class ArticleModule { }
