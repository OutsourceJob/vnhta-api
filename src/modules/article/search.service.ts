import { Injectable } from "@nestjs/common";
import * as _ from "lodash"
import { Connection } from "typeorm";
import { ArticleService } from "./article.service";
import { NormalSearchDTO } from "./article.dto";
import { ArticleTopic } from "src/interfaces";

@Injectable()
export class SearchService {
  constructor(
    private connection: Connection,
    private articleService: ArticleService
  ) { }

  generateConditionStatement(words: Array<string>) {
    const titleCondition = _.map(words, word => {
      return `title REGEXP "${word}"`
    })

    const title2Condition = _.map(words, word => {
      return `title2 REGEXP "${word}"`
    })

    const abstractCondition = _.map(words, word => {
      return `abstract REGEXP "${word}"`
    })
    const keyWordsCondition = _.map(words, word => {
      return `key_words REGEXP "${word}"`
    })

    const conditions = _.chain(
      [
        titleCondition,
        title2Condition,
        abstractCondition,
        keyWordsCondition
      ]
    )
      .flatten()
      .join(" OR ")
      .thru(conditon => {
        return "( " + conditon + " )"
      })
      .value()

    return conditions
  }

  extractCondition(text: string) {
    console.log("extractCondition")
    const sentences = text.split(/[~]/)

    for (const index in sentences) {
      const sentence = sentences[index];
      const isCondition = sentence.indexOf("=") > -1 ||
        sentence.indexOf(">") > -1 ||
        sentence.indexOf(">=") > -1 ||
        sentence.indexOf("<") > -1 ||
        sentence.indexOf("<=") > -1
      if (isCondition) {
        const condition = this.convertTextToMySQLCondition(sentence)
        sentences[index] = condition;
      }
    }

    const sqlWhereCondition = _.join(sentences, " ");

    return sqlWhereCondition;
  }

  convertTextToMySQLCondition(condition: string) {
    if (condition.indexOf("words") > -1) {
      return _.chain(condition)
        .split("=")
        .last()
        .split('"')
        .filter(a => !!a)
        .join("")
        .toLower()
        .trim()
        .thru(word => this.generateConditionStatement([word]))
        .value()
    }

    return condition;
  }

  async searchAdvanced(data: NormalSearchDTO) {

    const text = _.get(data, "text", "")
    const startYear = _.get(data, "startYear", 1990)
    const endYear = _.get(data, "endYear", 2100)
    const languages = _.get(data, "languages", "")
    const topics = _.get(data, "topics")
    const filterCostBenefitTopic = _.includes(topics, ArticleTopic.CostBenefit)
    const filterCostEffectivenessTopic = _.includes(topics, ArticleTopic.CostEffectiveness)
    const filterQualityOfLifeTopic = _.includes(topics, ArticleTopic.QualityOfLife)

    const sqlWhereCondition = text.includes("~") ? this.extractCondition(text) : this.generateConditionStatement([text]);
    console.log("SearchService -> searchAdvanced -> sqlWhereCondition", sqlWhereCondition)

    const filterTopics = [filterCostBenefitTopic, filterCostEffectivenessTopic, filterQualityOfLifeTopic]

    const filterTopicStatement = _.filter(filterTopics).length > 0 ? "AND (" + _.chain(filterTopics)
      .map((filterTopic, index) => {
        if (filterTopic && index === 0) return "cost_benefit.is_active = TRUE"
        if (filterTopic && index === 1) return "cost_effectiveness.is_active = TRUE"
        if (filterTopic && index === 2) return "quality_of_life.is_active = TRUE"
      })
      .filter()
      .join(" OR ")
      .value() + ")" : ""

    const query = `
      SELECT article.*
      FROM article
      LEFT JOIN cost_benefit ON cost_benefit.article_id = article.id
      LEFT JOIN cost_effectiveness ON cost_effectiveness.article_id = article.id
      LEFT JOIN quality_of_life ON quality_of_life.article_id = article.id
      WHERE 
        ${sqlWhereCondition}
        AND (year BETWEEN ${startYear} and ${endYear}) 
        ${languages ? "AND language IN (" + languages + ")" : ""} 
        ${filterTopicStatement}
    `

    const articles = await this.connection.query(query);
    return this.articleService.formatRawArticles(articles)
  }

  // async searchNormal(data: NormalSearchDTO) {
  //   const text = _.get(data, "text", "")
  //   const startYear = _.get(data, "startYear", 1990)
  //   const endYear = _.get(data, "endYear", 2100)
  //   const languages: string = _.get(data, "languages", "").replace("[", "").replace("]", "")
  //   const topics = _.get(data, "topics", [])

  //   const textStatement = this.generateConditionStatement([text])

  //   const query = `
  //     SELECT *
  //     FROM article
  //     LEFT JOIN cost_benefit ON cost_benefit.article_id = article.id
  //     LEFT JOIN cost_effectiveness ON cost_effectiveness.article_id = article.id
  //     LEFT JOIN quality_of_life ON quality_of_life.article_id = article.id
  //     WHERE 
  //       ${textStatement}
  //       AND (year BETWEEN ${startYear} and ${endYear})
  //       ${languages ? "AND language IN (" + languages + ")" : ""} 
  //   `

  //   console.log(query)

  //   const articles = await this.connection.query(query);
  //   return this.articleService.formatRawArticles(articles)
  // }
}