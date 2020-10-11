import { Controller, Get, Post, UseInterceptors, UploadedFile, Param, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { FileType } from "src/interfaces";

@Controller("/uploads")
export class UploadController {
  constructor(
    private uploadService: UploadService,
  ) { }

  @Post("/image")
  @UseInterceptors(FileInterceptor("image"))
  uploadImage(@UploadedFile() file: any) {
    const res = this.uploadService.uploadFile(file.buffer, file.originalname)
    return res;
  }
}