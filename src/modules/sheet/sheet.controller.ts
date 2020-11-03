import { Controller, Get } from "@nestjs/common";
import { SheetService } from "./sheet.service";

@Controller("/sheets")
export class SheetController {
  constructor(
    private sheetService: SheetService
  ) { }

  @Get("/download")
  async downloadCsvFile() {
    await this.sheetService.queryRawFile()
    return {
      link: process.env.SELF_HOST + "/downloads/report.csv"
    }
  }
}