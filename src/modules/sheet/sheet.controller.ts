import { Body, Controller, Get } from "@nestjs/common";
import { SheetService } from "./sheet.service";

@Controller("/sheets")
export class SheetController {
  constructor(
    private sheetService: SheetService
  ) { }

  @Get("/download")
  async downloadCsvFile(
    @Body("articleIdArray") articleIdArray?: Array<number>
  ) {
    await this.sheetService.queryRawFile(articleIdArray);
    return {
      link: process.env.SELF_HOST + "/downloads/report.csv"
    }
  }
}