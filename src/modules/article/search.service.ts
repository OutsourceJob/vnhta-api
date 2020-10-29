import { Injectable } from "@nestjs/common";
import * as _ from "lodash"
import * as translate from "translate";

@Injectable()
export class SearchService {
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
      .value()

    return conditions
  }

  async generateWords(word: string): Promise<string[]> {
    return translate(word, { from: "en", to: "vi" })
      .then(text => {
        console.log(text);
      })
      .catch(console.log)
  }
}