import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from './author.entity';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { ArticleAuthorEntity } from './article-author/article-author.entity';
import { ArticleAuthorService } from './article-author/article-author.service';

@Module({
    imports: [TypeOrmModule.forFeature([AuthorEntity, ArticleAuthorEntity])],
    controllers: [AuthorController],
    providers: [AuthorService, ArticleAuthorService],
    exports: [AuthorService, ArticleAuthorService]
})
export class AuthorModule { }
