import { Connection } from 'typeorm';
import * as _ from "lodash";
import { Injectable } from '@nestjs/common';

@Injectable()
export class StatisticsService {
  constructor(
    private connection: Connection
  ) { }

  async getYearStatistics(articleIdArray: number[]): Promise<any[]> {
    return await this.connection.query(`
      SELECT year, COUNT(*) AS quantity
      FROM
        article
      WHERE id IN (${_.toString(articleIdArray)})
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

  async getJournalStatistics(articleIdArray: number[]): Promise<any[]> {
    return await this.connection.query(`
      SELECT 
        journal.fullName, 
        COUNT(*) AS quantity
      FROM 
        article
      LEFT JOIN 
        journal ON journal.id = article.journal_id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        journal.id;
    `);
  }

  async getLanguageStatistics(articleIdArray: number[]): Promise<any[]> {
    return await this.connection.query(`
      SELECT 
        language, 
        COUNT(*) AS quantity
      FROM 
        article
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        language;
    `);
  }

  async getAuthorStatistics(articleIdArray: number[]): Promise<any[]> {
    return await this.connection.query(`
      SELECT 
        journal.fullName, 
        COUNT(*) AS quantity
      FROM 
        article
      LEFT JOIN 
        journal ON journal.id = article.journal_id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        journal.id;
    `);
  }
}