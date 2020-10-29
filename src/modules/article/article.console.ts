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
    return this.searchService.generateWords(word);
  }
}