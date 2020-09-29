import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm"
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Connection } from 'typeorm';
import { CollectionEntity } from './collection.entity';
import { ArticleService } from '../article/article.service';
import { ArticleType, ArticleStatus, Language } from '../../interfaces/index';
import { CreateCollectionDTO } from './collection.dto';
import * as _ from "lodash";

@Injectable()
export class CollectionService extends TypeOrmCrudService<CollectionEntity> {
  constructor(
    @InjectRepository(CollectionEntity) repo: Repository<CollectionEntity>,
    private articleService: ArticleService,
    private connection: Connection
  ) {
    super(repo);
  }

  async createCollection(data: CreateCollectionDTO) {
    return await this.repo.create(data).save();
  }

  async addArticleToCollection(collectionId: number, articleId: number) {
    const foundArticle = await this.articleService.findOne(articleId)
    if (!foundArticle) throw new NotFoundException("Article not found")

    if (foundArticle.type === ArticleType.Template) throw new BadRequestException("Cannot add template to collection")

    if (foundArticle.status === ArticleStatus.Draft) throw new BadRequestException("Article needs to be published")

    const foundCollection = await this.repo.findOne(collectionId)
    if (!foundCollection) throw new NotFoundException("Collection not found")

    foundArticle.collectionId = collectionId;

    const query = `
      UPDATE article SET collection_id = ${collectionId} WHERE article.id = ${articleId}
    `

    await this.connection.query(query);

    return foundArticle
  }

  /**
   * @describe each collection has many articles
   * @describe each articles has many versions
   * @todo from collection => get all articles, each article includes latest version
   */
  async getLatestVersionsByCollectionId(collectionId: number) {
    const query = `
      SELECT 
        collection_versions.* 
      FROM (
        SELECT 
          collection.id AS collectionId,
          article.created_at AS timestamp,
          version.*
        FROM collection
        LEFT JOIN article
          ON article.collection_id = collection.id
        LEFT JOIN version
          ON version.article_id = article.id
        WHERE collection.id = ${collectionId}
      ) AS collection_versions
      INNER JOIN (
        SELECT article_id, MAX(id) AS id
        FROM version
        GROUP BY article_id
      ) AS latest_version
        ON collection_versions.id = latest_version.id
      ORDER BY collection_versions.timestamp DESC;
    `

    const sqlResult = await this.connection.query(query);
    return _.map(sqlResult, version => {
      return {
        ...version,
        content: JSON.parse(version.content)
      }
    });
  }

  async getRandomAndLatestVersion(collectionId: number) {
    const query = `
      SELECT
        * 
      FROM
        (
        SELECT
          * 
        FROM
          (
          SELECT
            collection_versions.* 
          FROM
            (
            SELECT
              collection.id AS collectionId,
              article.created_at AS TIMESTAMP,
              version.* 
            FROM
              collection
              LEFT JOIN article ON article.collection_id = collection.id
              LEFT JOIN version ON version.article_id = article.id 
            WHERE
              collection.id = ${collectionId}
            ) AS collection_versions
            INNER JOIN ( SELECT article_id, MAX( id ) AS id FROM version GROUP BY article_id ) AS latest_version ON collection_versions.id = latest_version.id 
          ) tbl 
        ORDER BY
          RAND() 
          LIMIT 4 
        ) tbl_2 
      ORDER BY
        tbl_2.TIMESTAMP DESC
      `

    const sqlResult = await this.connection.query(query);
    return _.map(sqlResult, version => {
      return {
        ...version,
        content: JSON.parse(version.content)
      }
    });
  }
}