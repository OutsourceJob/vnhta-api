import { Injectable } from "@nestjs/common";
import * as _ from "lodash"
import { Connection } from "typeorm";
import { ArticleService } from "./article.service";

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
    const abstractCondition = _.map(words, word => {
      return `abstract REGEXP "${word}"`
    })
    const keyWordsCondition = _.map(words, word => {
      return `key_words REGEXP "${word}"`
    })

    const conditions = _.chain(
      [
        titleCondition,
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

  async searchAdvanced(text: string) {
    const sqlWhereCondition = this.extractCondition(text);

    const query = `
      SELECT *
      FROM article
      WHERE 
        ${sqlWhereCondition}
    `

    const articles = await this.connection.query(query);
    return this.articleService.formatRawArticles(articles)
  }
}