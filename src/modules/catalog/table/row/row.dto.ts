import { WriteFeatureDTO } from "../feature/feature.dto";

export class WriteRowDTO {
  tableId: number;
  varId: number;
  name: string;
  features: Array<WriteFeatureDTO>
}