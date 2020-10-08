export class WriteTableDTO {
  name: string;
  parameterCodeArray: Array<string>
}

export class WriteBaseCaseTableDTO {
  costEffectivenessId: number;
  name?: string;
  parameterCodeArray?: Array<string>
}