import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { VersionEntity } from './version.entity';
import * as _ from "lodash";
import { VersionRepository } from './version.repository';
import { ArticleService } from '../article/article.service';
import { VersionContent } from 'src/interfaces';
import { ArticleStatus } from '../../interfaces/index';

@Injectable()
export class VersionService {
  constructor(
    @InjectRepository(VersionRepository) private versionRepo: VersionRepository,
    private articleService: ArticleService,
  ) { }

  async createVersion(articleId: number): Promise<any> {
    const article = await this.articleService.findOne(articleId);
    if (!article) throw new NotFoundException("Article Not Found");

    const versionContent: VersionContent = {
      article
    }
    const newVersion = this.versionRepo.create({
      articleId,
      title: _.toString(new Date()),
      content: versionContent
    })

    article.status = ArticleStatus.Published;
    await article.save();

    return await newVersion.save()
  }

  async getVersionsByArticleId(articleId: number): Promise<VersionEntity[]> {
    return await this.versionRepo.find({ articleId })
  }
}
