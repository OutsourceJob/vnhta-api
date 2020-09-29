import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionEntity } from './collection.entity';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { ArticleModule } from '../article/article.module';
import { CollectionArticleController } from './collection-article.controller';
import { CollectionConsole } from './collection.console';

@Module({
  imports: [
    TypeOrmModule.forFeature([CollectionEntity]),
    ArticleModule,
  ],
  providers: [CollectionService, CollectionConsole],
  controllers: [CollectionController, CollectionArticleController],
  exports: [CollectionService]
})
export class CollectionModule { }