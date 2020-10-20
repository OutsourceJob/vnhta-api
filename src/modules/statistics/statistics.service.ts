import { Controller } from "@nestjs/common";
import { Connection } from 'typeorm';
import * as _ from "lodash";

@Controller()
export class StatisticsService {
  constructor(
    private connection: Connection
  ) { }

  async getYearStatistics(articleIdArray: number[]): Promise<any[]> {
    return await this.connection.query(`
      SELECT year, COUNT(*) AS quantity
      FROM
        article
      WHERE id IN (1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14)
      GROUP BY year;
    `)
  }

  async getPathologyStatistics(articleIdArray: number[]) {
    return await this.connection.query(`
      SELECT 
        pathology.name,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN cost_benefit ON cost_benefit.id = article.id
      LEFT JOIN pathology ON pathology.id = cost_benefit.pathology_id
      WHERE article.id IN (1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14)
      GROUP BY pathology.id
    `)
  }
}