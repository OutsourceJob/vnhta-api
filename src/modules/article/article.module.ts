import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleController } from './article.controller';
import { ArticleVersionController } from './article-version.controller';
import { ArticleEntity } from './article.entity';
import { ArticleService } from './article.service';
import { VersionService } from '../version/version.service';
import { VersionRepository } from '../version/version.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleEntity, VersionRepository]),
  ],
  providers: [ArticleService, VersionService],
  controllers: [ArticleController, ArticleVersionController],
  exports: [ArticleService]
})
export class ArticleModule { }