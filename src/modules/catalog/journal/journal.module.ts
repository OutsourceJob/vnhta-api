import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalEntity } from './journal.entity';
import { JournalService } from './journal.service';
import { JournalController } from './journal.controller';
import { ArticleJournalService } from './article-journal/article-journal.service';
import { ArticleJournalEntity } from './article-journal/article-journal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JournalEntity, ArticleJournalEntity])],
  controllers: [JournalController],
  providers: [JournalService, ArticleJournalService],
  exports: [JournalService, ArticleJournalService]
})
export class JournalModule { }
