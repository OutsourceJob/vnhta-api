import { WriteFeatureDTO } from "../feature/feature.dto";
import { IsNotEmpty } from "class-validator";

export class WriteRowDTO {
  @IsNotEmpty()
  tableId: number;
  varId: number;
  name: string;
  features: Array<WriteFeatureDTO>
}