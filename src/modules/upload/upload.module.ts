import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import * as path from "path";
import { UploadService } from './upload.service';

@Module({
  imports: [],
  providers: [UploadService],
  controllers: [],
})
export class UploadModule { }