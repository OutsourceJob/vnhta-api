import { Connection } from 'typeorm';
import * as _ from "lodash";
import { Injectable } from '@nestjs/common';
import * as catalogs from "../../data/catalogs";

@Injectable()
export class StatisticsService {
  constructor(
    private connection: Connection
  ) { }

  formatResponse(res: any, label: string) {
    let formatRes = _.filter(res, item => item[label]);
    const sum = _.sumBy(formatRes, (item: any) => _.parseInt(item.quantity))
    let temp = 0;

    let lastRes = _.chain(formatRes)
      .map(item => {
        const newItem = {
          ...item,
          quantity: _.parseInt(item.quantity),
          percent: item[label] === formatRes[formatRes.length - 1][label]
            ? _.round(100 - temp, 2)
            : _.round(item.quantity * 100 / sum, 2)
        }

        temp += newItem.percent;

        return newItem;
      })
      .orderBy([label])
      .filter(label)
      .value()

    return lastRes;
  }

  async getYearStatistics(articleIdArray: number[]): Promise<any[]> {
    let res = await this.connection.query(`
      SELECT 
        year AS label, 
        COUNT(*) AS quantity
      FROM
        article
      WHERE 
        id IN (${_.toString(articleIdArray)})
      GROUP BY 
        year;
    `)

    return this.formatResponse(res, "label");
  }

  async getPathologyStatistics(articleIdArray: number[]) {
    let res = await this.connection.query(`
      SELECT 
        pathology.name AS label,
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

    return this.formatResponse(res, "label");
  }

  async getJournalStatistics(articleIdArray: number[]): Promise<any[]> {
    let res = await this.connection.query(`
      SELECT 
        journal.fullName AS label, 
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

    return this.formatResponse(res, "label");
  }

  async getLanguageStatistics(articleIdArray: number[]): Promise<any[]> {
    let res = await this.connection.query(`
      SELECT 
        language AS label, 
        COUNT(*) AS quantity
      FROM 
        article
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        language;
    `);

    return this.formatResponse(res, "label");
  }

  async getIcd20Statistics(articleIdArray: number[]): Promise<any[]> {
    let res = await this.connection.query(`
      SELECT 
        icd_20.code AS label,
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

    return this.formatResponse(res, "label");
  }

  async getInterventionStatistics(articleIdArray: number[]): Promise<any[]> {
    let res = await this.connection.query(`
      SELECT 
        intervention.name AS label,
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

    return this.formatResponse(res, "label");
  }

  async getStudyLocationStatistics(articleIdArray: number[]): Promise<any[]> {
    let res = await this.connection.query(`
      SELECT 
        study_location.name AS label,
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

    return this.formatResponse(res, "label");
  }

  async getStudyDesignStatistics(articleIdArray: number[]): Promise<any[]> {
    let res = await this.connection.query(`
      SELECT 
        cost_benefit.study_design_id AS label,
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

    const formatRes = this.formatResponse(res, "label");

    return _.map(formatRes, item => ({
      ...item,
      label: catalogs
        .studyDesigns[_.findIndex(catalogs.studyDesigns, catalogItem => catalogItem.id === item.label)]
        .name
    }));
  }

  async getDataCollectingMethodStatistics(articleIdArray: number[]): Promise<any[]> {
    const res = _.chain(catalogs.dataCollectingMethods).map(method => {
      if (method.id >= 2) {
        return (`
            UNION
            SELECT 
              ${method.id} AS label,
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

    let newRes = await this.connection.query(`
      SELECT 
        1 AS label,
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

    newRes = _.filter(newRes, item => _.parseInt(item.quantity) > 0);

    const formatRes = this.formatResponse(res, "label");

    return _.map(formatRes, item => ({
      ...item,
      label: catalogs
        .dataCollectingMethods[_.findIndex(catalogs.dataCollectingMethods, catalogItem => catalogItem.id.toString() === item.label)]
        .name
    }));
  }

  async getSampleSizeStatistics(articleIdArray: number[]): Promise<any[]> {
    const res = await this.connection.query(`
      SELECT 
        cost_benefit.sample_size_id AS label,
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

    const formatRes = this.formatResponse(res, "label");

    return _.map(formatRes, item => ({
      ...item,
      label: catalogs
        .sampleSizes[_.findIndex(catalogs.sampleSizes, catalogItem => catalogItem.id === item.label)]
        .name
    }));
  }

  async getSamplingMethodStatistics(articleIdArray: number[]): Promise<any[]> {
    const res = await this.connection.query(`
      SELECT 
        cost_benefit.sampling_method_id AS label,
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

    const formatRes = this.formatResponse(res, "label");

    return _.map(formatRes, item => ({
      ...item,
      label: catalogs
        .samplingMethods[_.findIndex(catalogs.samplingMethods, catalogItem => catalogItem.id === item.label)]
        .name
    }));
  }

  async getCostTypeStatistics(articleIdArray: number[]): Promise<any[]> {
    const res = await this.connection.query(`
      SELECT 
        cost_benefit.cost_type_id AS label,
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

    const formatRes = this.formatResponse(res, "label");

    return _.map(formatRes, item => ({
      ...item,
      label: catalogs
        .costTypes[_.findIndex(catalogs.costTypes, catalogItem => catalogItem.id === item.label)]
        .name
    }));
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

    let newRes = await this.connection.query(`
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

    newRes = _.filter(newRes, item => _.parseInt(item.quantity) > 0);

    const formatRes = this.formatResponse(newRes, "label");

    return _.map(formatRes, item => ({
      ...item,
      label: catalogs
        .costComponents[_.findIndex(catalogs.costComponents, catalogItem => catalogItem.id.toString() === item.label)]
        .name
    }));
  }

  async getYearOfCostStatistics(articleIdArray: number[]): Promise<any[]> {
    const res = await this.connection.query(`
      SELECT 
        cost_benefit.year_of_cost AS label, 
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

    return this.formatResponse(res, "label");
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

    let newRes = await this.connection.query(`
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

    newRes = _.filter(newRes, item => _.parseInt(item.quantity) > 0);

    const formatRes = this.formatResponse(newRes, "label");

    return _.map(formatRes, item => ({
      ...item,
      label: catalogs
        .studyPerspectives[_.findIndex(catalogs.studyPerspectives, catalogItem => catalogItem.id.toString() === item.label)]
        .name
    }));
  }

  async getQLPathologyStatistics(articleIdArray: number[]) {
    const res = await this.connection.query(`
      SELECT 
        pathology.name AS label,
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

    return this.formatResponse(res, "label");
  }

  async getQLIcd20Statistics(articleIdArray: number[]): Promise<any[]> {
    const res = await this.connection.query(`
      SELECT 
        icd_20.code AS label,
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

    return this.formatResponse(res, "label");
  }

  async getQLInterventionStatistics(articleIdArray: number[]): Promise<any[]> {
    const res = await this.connection.query(`
      SELECT 
        intervention.name AS label,
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

    return this.formatResponse(res, "label");
  }

  async getQLStudyLocationStatistics(articleIdArray: number[]): Promise<any[]> {
    const res = await this.connection.query(`
      SELECT 
        study_location.name AS label,
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

    return this.formatResponse(res, "label");
  }

  async getQLStudyDesignStatistics(articleIdArray: number[]): Promise<any[]> {
    const res = await this.connection.query(`
      SELECT 
        quality_of_life.ql_study_design_id AS label,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        quality_of_life ON quality_of_life.article_id = article.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        quality_of_life.ql_study_design_id
    `)

    const formatRes = this.formatResponse(res, "label");

    return _.map(formatRes, item => ({
      ...item,
      label: catalogs
        .studyDesigns[_.findIndex(catalogs.studyDesigns, catalogItem => catalogItem.id === item.label)]
        .name
    }));
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

    let newRes = await this.connection.query(`
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

    newRes = _.filter(newRes, item => _.parseInt(item.quantity) > 0);

    const formatRes = this.formatResponse(newRes, "label");

    return _.map(formatRes, item => ({
      ...item,
      label: catalogs
        .dataCollectingMethods[_.findIndex(catalogs.dataCollectingMethods, catalogItem => catalogItem.id.toString() === item.label)]
        .name
    }));
  }

  async getQLSampleSizeStatistics(articleIdArray: number[]): Promise<any[]> {
    const res = await this.connection.query(`
      SELECT 
        quality_of_life.sample_size_id AS label,
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

    const formatRes = this.formatResponse(res, "label");

    return _.map(formatRes, item => ({
      ...item,
      label: catalogs
        .sampleSizes[_.findIndex(catalogs.sampleSizes, catalogItem => catalogItem.id === item.label)]
        .name
    }));
  }

  async getQLSamplingMethodStatistics(articleIdArray: number[]): Promise<any[]> {
    const res = await this.connection.query(`
      SELECT 
        quality_of_life.sampling_method_id AS label,
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

    const formatRes = this.formatResponse(res, "label");

    return _.map(formatRes, item => ({
      ...item,
      label: catalogs
        .samplingMethods[_.findIndex(catalogs.samplingMethods, catalogItem => catalogItem.id === item.label)]
        .name
    }));
  }

  async getCEPathologyStatistics(articleIdArray: number[]) {
    const res = await this.connection.query(`
      SELECT 
        pathology.name AS label,
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

    return this.formatResponse(res, "label");
  }

  async getCEIcd20Statistics(articleIdArray: number[]): Promise<any[]> {
    const res = await this.connection.query(`
      SELECT 
        icd_20.code AS label,
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

    return this.formatResponse(res, "label");
  }

  async getCEInterventionStatistics(articleIdArray: number[]): Promise<any[]> {
    let res = await this.connection.query(`
      SELECT 
        intervention.name AS label,
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

    return this.formatResponse(res, "label");
  }

  async getCEComparatorStatistics(articleIdArray: number[]): Promise<any[]> {
    const res = await this.connection.query(`
      SELECT 
        comparator.name AS label,
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

    return this.formatResponse(res, "label");
  }

  async getCEOutcomeStatistics(articleIdArray: number[]): Promise<any[]> {
    const res = await this.connection.query(`
      SELECT 
        outcome.name AS label,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_effectiveness ON cost_effectiveness.article_id = article.id
      LEFT JOIN 
        cost_effectiveness_outcome ON cost_effectiveness_outcome.cost_effectiveness_id = cost_effectiveness.id
      LEFT JOIN 
        outcome ON cost_effectiveness_outcome.outcome_id = outcome.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        outcome.id
    `)

    return this.formatResponse(res, "label");
  }

  async getCEStudyLocationStatistics(articleIdArray: number[]): Promise<any[]> {
    const res = await this.connection.query(`
      SELECT 
        study_location.name AS label,
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

    return this.formatResponse(res, "label");
  }

  async getCEStudyDesignStatistics(articleIdArray: number[]): Promise<any[]> {
    const res = await this.connection.query(`
      SELECT 
        cost_effectiveness.ce_study_design_id AS label,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_effectiveness ON cost_effectiveness.article_id = article.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        cost_effectiveness.ce_study_design_id
    `)

    const formatRes = this.formatResponse(res, "label");

    return _.map(formatRes, item => ({
      ...item,
      label: catalogs
        .studyDesigns[_.findIndex(catalogs.studyDesigns, catalogItem => catalogItem.id === item.label)]
        .name
    }));
  }

  async getCEAnalysisMethodStatistics(articleIdArray: number[]): Promise<any[]> {
    const res = await this.connection.query(`
      SELECT 
        cost_effectiveness.analysis_method_id AS label,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_effectiveness ON cost_effectiveness.article_id = article.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        cost_effectiveness.analysis_method_id
    `)

    const formatRes = this.formatResponse(res, "label");

    return _.map(formatRes, item => ({
      ...item,
      label: catalogs
        .analysisMethods[_.findIndex(catalogs.analysisMethods, catalogItem => catalogItem.id === item.label)]
        .name
    }));
  }

  async getCEModelTypeStatistics(articleIdArray: number[]): Promise<any[]> {
    const res = _.chain(catalogs.modelTypes).map(item => {
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
              cost_effectiveness.model_type_id_array LIKE "%${item.id}%"
          `)
      }
    }).join('').value();

    let newRes = await this.connection.query(`
      SELECT 
        "1" AS label,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_effectiveness ON cost_effectiveness.article_id = article.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)}) AND
        cost_effectiveness.model_type_id_array REGEXP "1"
      ${res}
    `)

    newRes = _.filter(newRes, item => _.parseInt(item.quantity) > 0);

    const formatRes = this.formatResponse(newRes, "label");

    return _.map(formatRes, item => ({
      ...item,
      label: catalogs
        .modelTypes[_.findIndex(catalogs.modelTypes, catalogItem => catalogItem.id.toString() === item.label)]
        .name
    }));
  }

  async getCEStudyPerspectiveStatistics(articleIdArray: number[]): Promise<any[]> {
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
              cost_effectiveness ON cost_effectiveness.article_id = article.id
            WHERE 
              article.id IN (${_.toString(articleIdArray)}) AND
              cost_effectiveness.study_perspective_id_array LIKE "%${item.id}%"
          `)
      }
    }).join('').value();

    let newRes = await this.connection.query(`
      SELECT 
        "1" AS label,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_effectiveness ON cost_effectiveness.article_id = article.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)}) AND
        cost_effectiveness.study_perspective_id_array REGEXP "1"
      ${res}
    `)

    newRes = _.filter(newRes, item => _.parseInt(item.quantity) > 0);

    const formatRes = this.formatResponse(newRes, "label");

    return _.map(formatRes, item => ({
      ...item,
      label: catalogs
        .studyPerspectives[_.findIndex(catalogs.studyPerspectives, catalogItem => catalogItem.id.toString() === item.label)]
        .name
    }));
  }

  async getCEEffectivenessDataCollectingMethodStatistics(articleIdArray: number[]): Promise<any[]> {
    const res = _.chain(catalogs.effectivenessDataCollectingMethods).map(item => {
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
              cost_effectiveness.effectiveness_data_collecting_method_id_array LIKE "%${item.id}%"
          `)
      }
    }).join('').value();

    let newRes = await this.connection.query(`
      SELECT 
        "1" AS label,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_effectiveness ON cost_effectiveness.article_id = article.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)}) AND
        cost_effectiveness.effectiveness_data_collecting_method_id_array REGEXP "1"
      ${res}
    `)

    newRes = _.filter(newRes, item => _.parseInt(item.quantity) > 0);

    const formatRes = this.formatResponse(newRes, "label");

    return _.map(formatRes, item => ({
      ...item,
      label: catalogs
        .effectivenessDataCollectingMethods[_.findIndex(catalogs.effectivenessDataCollectingMethods, catalogItem => catalogItem.id.toString() === item.label)]
        .name
    }));
  }

  async getCETypeOfEffectivenessStatistics(articleIdArray: number[]): Promise<any[]> {
    const res = await this.connection.query(`
      SELECT 
        effectiveness_type.name AS label,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_effectiveness ON cost_effectiveness.article_id = article.id
      LEFT JOIN 
        cost_effectiveness_effectiveness_type ON cost_effectiveness_effectiveness_type.cost_effectiveness_id = cost_effectiveness.id
      LEFT JOIN 
        effectiveness_type ON cost_effectiveness_effectiveness_type.effectiveness_type_id = effectiveness_type.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        effectiveness_type.id
    `)

    return this.formatResponse(res, "label");
  }

  async getCECostComponentStatistics(articleIdArray: number[]): Promise<any[]> {
    const res = _.chain(catalogs.costComponents).map(item => {
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
              cost_effectiveness.cost_component_id_array LIKE "%${item.id}%"
          `)
      }
    }).join('').value();

    let newRes = await this.connection.query(`
      SELECT 
        "1" AS label,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_effectiveness ON cost_effectiveness.article_id = article.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)}) AND
        cost_effectiveness.cost_component_id_array REGEXP "1"
      ${res}
    `)

    newRes = _.filter(newRes, item => _.parseInt(item.quantity) > 0);

    const formatRes = this.formatResponse(newRes, "label");

    return _.map(formatRes, item => ({
      ...item,
      label: catalogs
        .costComponents[_.findIndex(catalogs.costComponents, catalogItem => catalogItem.id.toString() === item.label)]
        .name
    }));
  }

  async getCEYearOfCostStatistics(articleIdArray: number[]): Promise<any[]> {
    const res = await this.connection.query(`
      SELECT 
        cost_effectiveness.year_of_cost AS label,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_effectiveness ON cost_effectiveness.article_id = article.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
      cost_effectiveness.year_of_cost;
    `)

    return this.formatResponse(res, "label");
  }

  async getCEHeterogeneityAnalysisStatistics(articleIdArray: number[]): Promise<any[]> {
    const res = _.chain(catalogs.heterogeneityAnalysis).map(item => {
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
              cost_effectiveness.heterogeneity_analysis_id_array LIKE "%${item.id}%"
          `)
      }
    }).join('').value();

    let newRes = await this.connection.query(`
      SELECT 
        "1" AS label,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_effectiveness ON cost_effectiveness.article_id = article.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)}) AND
        cost_effectiveness.heterogeneity_analysis_id_array REGEXP "1"
      ${res}
    `)

    newRes = _.filter(newRes, item => _.parseInt(item.quantity) > 0);

    const formatRes = this.formatResponse(newRes, "label");

    return _.map(formatRes, item => ({
      ...item,
      label: catalogs
        .heterogeneityAnalysis[_.findIndex(catalogs.heterogeneityAnalysis, catalogItem => catalogItem.id.toString() === item.label)]
        .name
    }));
  }

  async getCEUncertaintyAnalysisMethodStatistics(articleIdArray: number[]): Promise<any[]> {
    const res = await this.connection.query(`
      SELECT 
        uncertainty_analysis_method.name AS label,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_effectiveness ON cost_effectiveness.article_id = article.id
      LEFT JOIN 
        cost_effectiveness_uncertainty_analysis_method_bk ON cost_effectiveness_uncertainty_analysis_method_bk.cost_effectiveness_id = cost_effectiveness.id
      LEFT JOIN 
        uncertainty_analysis_method ON cost_effectiveness_uncertainty_analysis_method_bk.uncertainty_analysis_method_id = uncertainty_analysis_method.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)})
      GROUP BY 
        uncertainty_analysis_method.id
    `)

    return this.formatResponse(res, "label");
  }

  async getCEUncertaintyAnalysisResultStatistics(articleIdArray: number[]): Promise<any[]> {
    const res = _.chain(catalogs.uncertaintyAnalysisResults).map(item => {
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
              cost_effectiveness.uncertainty_analysis_result_id_array LIKE "%${item.id}%"
          `)
      }
    }).join('').value();

    let newRes = await this.connection.query(`
      SELECT 
        "1" AS label,
        COUNT(*) AS quantity
      FROM
        article
      LEFT JOIN 
        cost_effectiveness ON cost_effectiveness.article_id = article.id
      WHERE 
        article.id IN (${_.toString(articleIdArray)}) AND
        cost_effectiveness.uncertainty_analysis_result_id_array REGEXP "1"
      ${res}
    `)

    newRes = _.filter(newRes, item => _.parseInt(item.quantity) > 0);

    const formatRes = this.formatResponse(newRes, "label");

    return _.map(formatRes, item => ({
      ...item,
      label: catalogs
        .uncertaintyAnalysisResults[_.findIndex(catalogs.uncertaintyAnalysisResults, catalogItem => catalogItem.id.toString() === item.label)]
        .name
    }));
  }
}