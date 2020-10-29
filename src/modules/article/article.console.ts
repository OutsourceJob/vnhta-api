import { Console, Command } from "nestjs-console"
import { SearchService } from "./search.service";

@Console()
export class ArticleConsole {
  constructor(
    private searchService: SearchService
  ) { }

  @Command({
    command: "translate <word>"
  })
  translate(word: string) {
    // console.log(word)
    // return this.searchService.generateWords(word);
  }

  @Command({
    command: "generate-condition-statement <word>"
  })
  generateConditionStatement(word: string) {
    console.log(this.searchService.generateConditionStatement(["cost", "chi phí"]));
  }

  @Command({
    command: "extract-sentence"
  })
  extractSentence() {
    const sentence = `
      ( 
        ~ words="Costs and Cost Analysis" ~ OR 
        ~ words="Cost Minimization" ~ OR 
        ~ words="Economic Benefits" ~ OR 
        ~ words="Resource Utilization" ~ OR 
        ~ words="Cost-Benefit Analysis" ~ OR 
        ~ words="Financial Impact" ~ OR 
        ~ words="Cost Saving" ~
      ) AND
      (
        ~ year > 2010 ~
      )
    `
    return this.searchService.extractCondition(sentence)
  }
}