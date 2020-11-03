import { Module } from "@nestjs/common";
import { SheetService } from "./sheet.service";
import { SheetController } from "./sheet.controller";

@Module({
  imports: [],
  providers: [SheetService],
  controllers: [SheetController]
})
export class SheetModule { }