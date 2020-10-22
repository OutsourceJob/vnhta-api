import { Connection } from 'typeorm';
import * as _ from "lodash";
import { Injectable } from '@nestjs/common';
import * as catalogs from "../../data/catalogs";

@Injectable()
export class StatisticsService {
  constructor(
    private connection: Connection
  ) { }

  async getYearStatistics(articleIdArray: number[]): Promise<any[]> {
    return await this.connection.query(`
      SELECT 
        year, 
        COUNT(*) AS quantity
      FROM
        article
      WHERE 
        id IN (${_.toString(articleIdArray)})
      GROUP BY 
        year;
    `)
  }

  async getPathologyStatistics(articleIdArray: number[]) {
    return await this.connection.query(`
      SELECT 
        pathology.name AS pathology,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_benefit ON cost_benefit.article_id = article.id
      LEFT JOIN 
        pathology ON pathology.id = cost_benefit.pathology_id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        pathology.id
    `)
  }

  async getJournalStatistics(articleIdArray: number[]): Promise<any[]> {
    return await this.connection.query(`
      SELECT 
        journal.fullName AS journal, 
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

  async getIcd20Statistics(articleIdArray: number[]): Promise<any[]> {
    return await this.connection.query(`
      SELECT 
        icd_20.code AS icd20,
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
        intervention.name AS intervention,
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

  async getStudyLocationStatistics(articleIdArray: number[]): Promise<any[]> {
    return await this.connection.query(`
      SELECT 
        study_location.name AS studyLocation,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_benefit ON cost_benefit.article_id = article.id
      LEFT JOIN 
        cost_benefit_study_location ON cost_benefit_study_location.cost_benefit_id = cost_benefit.id
      LEFT JOIN 
        study_location ON cost_benefit_study_location.study_location_id = study_location.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        study_location.id
    `)
  }

  async getStudyDesignStatistics(articleIdArray: number[]): Promise<any[]> {
    return await this.connection.query(`
      SELECT 
        cost_benefit.study_design_id AS studyDesignId,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_benefit ON cost_benefit.article_id = article.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        cost_benefit.study_design_id
    `)
  }

  async getDataCollectingMethodStatistics(articleIdArray: number[]): Promise<any[]> {
    const res = _.chain(catalogs.dataCollectingMethods).map(method => {
      if (method.id >= 2) {
        return (`
            UNION
            SELECT 
              "${method.id}" AS label,
              COUNT(*) AS quantity
            FROM
              article
            LEFT JOIN 
              cost_benefit ON cost_benefit.article_id = article.id
            WHERE 
              article.id IN (${_.toString(articleIdArray)}) AND
              cost_benefit.data_collecting_method_id_array LIKE "%${method.id}%"
          `)
      }
    }).join('').value();

    return await this.connection.query(`
      SELECT 
        "1" AS label,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_benefit ON cost_benefit.article_id = article.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)}) AND
        cost_benefit.data_collecting_method_id_array REGEXP "1"
      ${res}
    `)
  }

  async getSampleSizeStatistics(articleIdArray: number[]): Promise<any[]> {
    return await this.connection.query(`
      SELECT 
        cost_benefit.sample_size_id AS samplesSize,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_benefit ON cost_benefit.article_id = article.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        cost_benefit.sample_size_id
    `)
  }

  async getSamplingMethodStatistics(articleIdArray: number[]): Promise<any[]> {
    return await this.connection.query(`
      SELECT 
        cost_benefit.sampling_method_id AS samplingMethod,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_benefit ON cost_benefit.article_id = article.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        cost_benefit.sampling_method_id
    `)
  }

  async getCostTypeStatistics(articleIdArray: number[]): Promise<any[]> {
    return await this.connection.query(`
      SELECT 
        cost_benefit.cost_type_id AS costType,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_benefit ON cost_benefit.article_id = article.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        cost_benefit.cost_type_id
    `)
  }

  async getCostComponentStatistics(articleIdArray: number[]): Promise<any[]> {
    const res = _.chain(catalogs.costComponents).map(cost => {
      if (cost.id >= 2) {
        return (`
            UNION
            SELECT 
              "${cost.id}" AS label,
              COUNT(*) AS quantity
            FROM
              article
            LEFT JOIN 
              cost_benefit ON cost_benefit.article_id = article.id
            WHERE 
              article.id IN (${_.toString(articleIdArray)}) AND
              cost_benefit.cost_component_id_array LIKE "%${cost.id}%"
          `)
      }
    }).join('').value();

    return await this.connection.query(`
      SELECT 
        "1" AS label,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_benefit ON cost_benefit.article_id = article.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)}) AND
        cost_benefit.cost_component_id_array REGEXP "1"
      ${res}
    `)
  }

  async getYearOfCostStatistics(articleIdArray: number[]): Promise<any[]> {
    return await this.connection.query(`
      SELECT 
        cost_benefit.year_of_cost, 
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_benefit ON cost_benefit.article_id = article.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
      cost_benefit.year_of_cost;
    `)
  }

  async getStudyPerspectiveStatistics(articleIdArray: number[]): Promise<any[]> {
    const res = _.chain(catalogs.studyPerspectives).map(item => {
      if (item.id >= 2) {
        return (`
            UNION
            SELECT 
              "${item.id}" AS label,
              COUNT(*) AS quantity
            FROM
              article
            LEFT JOIN 
              cost_benefit ON cost_benefit.article_id = article.id
            WHERE 
              article.id IN (${_.toString(articleIdArray)}) AND
              cost_benefit.study_perspective_id_array LIKE "%${item.id}%"
          `)
      }
    }).join('').value();

    return await this.connection.query(`
      SELECT 
        "1" AS label,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_benefit ON cost_benefit.article_id = article.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)}) AND
        cost_benefit.study_perspective_id_array REGEXP "1"
      ${res}
    `)
  }

  async getQLPathologyStatistics(articleIdArray: number[]) {
    return await this.connection.query(`
      SELECT 
        pathology.name AS pathology,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        quality_of_life ON quality_of_life.article_id = article.id
      LEFT JOIN 
        pathology ON pathology.id = quality_of_life.pathology_id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        pathology.id
    `)
  }

  async getQLIcd20Statistics(articleIdArray: number[]): Promise<any[]> {
    return await this.connection.query(`
      SELECT 
        icd_20.code AS icd20,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        quality_of_life ON quality_of_life.article_id = article.id
      LEFT JOIN 
        quality_of_life_icd_20 ON quality_of_life_icd_20.quality_of_life_id = quality_of_life.id
      LEFT JOIN 
        icd_20 ON quality_of_life_icd_20.icd_20_id = icd_20.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        icd_20.id
    `)
  }

  async getQLInterventionStatistics(articleIdArray: number[]): Promise<any[]> {
    return await this.connection.query(`
      SELECT 
        intervention.name AS intervention,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        quality_of_life ON quality_of_life.article_id = article.id
      LEFT JOIN 
        quality_of_life_intervention ON quality_of_life_intervention.quality_of_life_id = quality_of_life.id
      LEFT JOIN 
        intervention ON quality_of_life_intervention.intervention_id = intervention.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        intervention.id
    `)
  }

  async getQLStudyLocationStatistics(articleIdArray: number[]): Promise<any[]> {
    return await this.connection.query(`
      SELECT 
        study_location.name AS studyLocation,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        quality_of_life ON quality_of_life.article_id = article.id
      LEFT JOIN 
        quality_of_life_study_location ON quality_of_life_study_location.quality_of_life_id = quality_of_life.id
      LEFT JOIN 
        study_location ON quality_of_life_study_location.study_location_id = study_location.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        study_location.id
    `)
  }

  async getQLStudyDesignStatistics(articleIdArray: number[]): Promise<any[]> {
    return await this.connection.query(`
      SELECT 
        quality_of_life.study_design_id AS studyDesignId,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        quality_of_life ON quality_of_life.article_id = article.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        quality_of_life.study_design_id
    `)
  }

  async getQLDataCollectingMethodStatistics(articleIdArray: number[]): Promise<any[]> {
    const res = _.chain(catalogs.dataCollectingMethods).map(method => {
      if (method.id >= 2) {
        return (`
            UNION
            SELECT 
              "${method.id}" AS label,
              COUNT(*) AS quantity
            FROM
              article
            LEFT JOIN 
              quality_of_life ON quality_of_life.article_id = article.id
            WHERE 
              article.id IN (${_.toString(articleIdArray)}) AND
              quality_of_life.data_collecting_method_id_array LIKE "%${method.id}%"
          `)
      }
    }).join('').value();

    return await this.connection.query(`
      SELECT 
        "1" AS label,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        quality_of_life ON quality_of_life.article_id = article.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)}) AND
        quality_of_life.data_collecting_method_id_array REGEXP "1"
      ${res}
    `)
  }

  async getQLSampleSizeStatistics(articleIdArray: number[]): Promise<any[]> {
    return await this.connection.query(`
      SELECT 
        quality_of_life.sample_size_id AS samplesSize,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        quality_of_life ON quality_of_life.article_id = article.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        quality_of_life.sample_size_id
    `)
  }

  async getQLSamplingMethodStatistics(articleIdArray: number[]): Promise<any[]> {
    return await this.connection.query(`
      SELECT 
        quality_of_life.sampling_method_id AS samplingMethod,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        quality_of_life ON quality_of_life.article_id = article.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        quality_of_life.sampling_method_id
    `)
  }

  async getCEPathologyStatistics(articleIdArray: number[]) {
    return await this.connection.query(`
      SELECT 
        pathology.name AS pathology,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_effectiveness ON cost_effectiveness.article_id = article.id
      LEFT JOIN 
        pathology ON pathology.id = cost_effectiveness.pathology_id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        pathology.id
    `)
  }

  async getCEIcd20Statistics(articleIdArray: number[]): Promise<any[]> {
    return await this.connection.query(`
      SELECT 
        icd_20.code AS icd20,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_effectiveness ON cost_effectiveness.article_id = article.id
      LEFT JOIN 
        cost_effectiveness_icd_20 ON cost_effectiveness_icd_20.cost_effectiveness_id = cost_effectiveness.id
      LEFT JOIN 
        icd_20 ON cost_effectiveness_icd_20.icd_20_id = icd_20.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        icd_20.id
    `)
  }

  async getCEInterventionStatistics(articleIdArray: number[]): Promise<any[]> {
    return await this.connection.query(`
      SELECT 
        intervention.name AS intervention,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_effectiveness ON cost_effectiveness.article_id = article.id
      LEFT JOIN 
        cost_effectiveness_intervention ON cost_effectiveness_intervention.cost_effectiveness_id = cost_effectiveness.id
      LEFT JOIN 
        intervention ON cost_effectiveness_intervention.intervention_id = intervention.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        intervention.id
    `)
  }

  async getCEComparatorStatistics(articleIdArray: number[]): Promise<any[]> {
    return await this.connection.query(`
      SELECT 
        comparator.name AS comparator,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_effectiveness ON cost_effectiveness.article_id = article.id
      LEFT JOIN 
        cost_effectiveness_comparator ON cost_effectiveness_comparator.cost_effectiveness_id = cost_effectiveness.id
      LEFT JOIN 
        comparator ON cost_effectiveness_comparator.comparator_id = comparator.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        comparator.id
    `)
  }

  async getCEOutcomeStatistics(articleIdArray: number[]): Promise<any[]> {
    const res = _.chain(catalogs.outcomes).map(item => {
      if (item.id >= 2) {
        return (`
            UNION
            SELECT 
              "${item.id}" AS label,
              COUNT(*) AS quantity
            FROM
              article
            LEFT JOIN 
              cost_effectiveness ON cost_effectiveness.article_id = article.id
            WHERE 
              article.id IN (${_.toString(articleIdArray)}) AND
              cost_effectiveness.outcome_id_array LIKE "%${item.id}%"
          `)
      }
    }).join('').value();

    return await this.connection.query(`
      SELECT 
        "1" AS label,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_effectiveness ON cost_effectiveness.article_id = article.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)}) AND
        cost_effectiveness.outcome_id_array REGEXP "1"
      ${res}
    `)
  }

  async getCEStudyLocationStatistics(articleIdArray: number[]): Promise<any[]> {
    return await this.connection.query(`
      SELECT 
        study_location.name AS studyLocation,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_effectiveness ON cost_effectiveness.article_id = article.id
      LEFT JOIN 
        cost_effectiveness_study_location ON cost_effectiveness_study_location.cost_effectiveness_id = cost_effectiveness.id
      LEFT JOIN 
        study_location ON cost_effectiveness_study_location.study_location_id = study_location.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        study_location.id
    `)
  }

  async getCEStudyDesignStatistics(articleIdArray: number[]): Promise<any[]> {
    return await this.connection.query(`
      SELECT 
        cost_effectiveness.study_design_id AS studyDesignId,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_effectiveness ON cost_effectiveness.article_id = article.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        cost_effectiveness.study_design_id
    `)
  }
}