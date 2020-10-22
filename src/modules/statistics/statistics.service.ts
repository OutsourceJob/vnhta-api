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
      LEFT JOIN cost_benefit ON cost_benefit.article_id = article.id
      LEFT JOIN pathology ON pathology.id = cost_benefit.pathology_id
      WHERE article.id IN (${_.toString(articleIdArray)})
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

  async getIcd20Statistics(articleIdArray: number[]): Promise<any[]> {
    return await this.connection.query(`
      SELECT 
        icd_20.code AS Icd20,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_benefit ON cost_benefit.article_id = article.id
      LEFT JOIN 
        cost_benefit_icd_20 ON cost_benefit_icd_20.cost_benefit_id = cost_benefit.id
      LEFT JOIN 
        icd_20 ON cost_benefit_icd_20.icd_20_id = icd_20.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        icd_20.id
  `)
  }

  async getInterventionStatistics(articleIdArray: number[]): Promise<any[]> {
    return await this.connection.query(`
      SELECT 
        intervention.name AS Intervention,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_benefit ON cost_benefit.article_id = article.id
      LEFT JOIN 
        cost_benefit_intervention ON cost_benefit_intervention.cost_benefit_id = cost_benefit.id
      LEFT JOIN 
        intervention ON cost_benefit_intervention.intervention_id = intervention.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        intervention.id
  `)
  }
}