import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { AuthorModule } from '../author/author.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ArticleEntity]),
        AuthorModule
    ],
    controllers: [ArticleController],
    providers: [ArticleService],
})
export class ArticleModule { }
