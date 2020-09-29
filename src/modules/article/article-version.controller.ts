import { Controller, Get, Param, Post } from "@nestjs/common";
import { VersionService } from '../version/version.service';
import { VersionEntity } from '../version/version.entity';

@Controller("/articles/:articleId/versions")
export class ArticleVersionController {
  constructor(
    private versionService: VersionService
  ) { }

  @Get()
  async getVersionsByArticleId(@Param("articleId") articleId: number): Promise<VersionEntity[]> {
    return await this.versionService.getVersionsByArticleId(articleId);
  }

  @Post()
  async createVersion(@Param("articleId") articleId: number): Promise<VersionEntity> {
    return await this.versionService.createVersion(articleId);
  }
}