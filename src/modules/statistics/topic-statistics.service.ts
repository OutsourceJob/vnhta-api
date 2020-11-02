import { Injectable } from "@nestjs/common";
import { StatisticsService } from "./statistics.service"
import { Connection } from "typeorm";
import * as _ from "lodash";

@Injectable()
export class TopicStatisticsService {
  constructor(
    private statisticsService: StatisticsService,
    private connection: Connection
  ) { }

  async categorizeArticles(articleIdArray: number[]): Promise<any> {
    let res = await this.connection.query(`
      SELECT 
        article.id,
        cost_benefit.is_active AS cost_benefit_status,
        cost_effectiveness.is_active AS cost_effectiveness_status,
        quality_of_life.is_active AS quality_of_life_status
      FROM article
      LEFT JOIN cost_benefit ON cost_benefit.article_id = article.id
      LEFT JOIN cost_effectiveness ON cost_effectiveness.article_id = article.id
      LEFT JOIN quality_of_life ON quality_of_life.article_id = article.id
      WHERE 
      article.id IN (${_.toString(articleIdArray)})
    `)

    return {
      articleIdArray: articleIdArray,
      costBenefitIdArray: _.chain(res).filter("cost_benefit_status").map("id").value(),
      costEffectivenessIdArray: _.chain(res).filter("cost_effectiveness_status").map("id").value(),
      qualityOfLifeIdArray: _.chain(res).filter("quality_of_life_status").map("id").value()
    }
  }

  async getArticleStatistics(idArray: number) {

  }

  async getCostBenefitStatistics(idArray: number) {

  }
}