import { Injectable } from "@nestjs/common";
import { S3 } from "aws-sdk"
import { config } from '../../config/index';
import { FileType } from '../../interfaces/index';

@Injectable()
export class UploadService {

  async uploadFile(dataBuffer: Buffer, fileName: string, fileType: FileType = FileType.PDF) {
    const s3 = new S3();
    const uploadResult = await s3.upload({
      Bucket: `${config.AWS_PUBLIC_BUCKET_NAME}/${fileType}s`,
      Body: dataBuffer,
      Key: `${Date.now()}-${fileName}`,
    })
      .promise();

    return {
      [`${fileType}Url`]: uploadResult.Location
    }
  }
}