export class WriteCostBenefitDTO {
  articleId: number;
  pathologyId?: number;
  icd20Id?: number;
  interventionIdArray?: number[];
  studyLocationIdArray?: number[];
  studyDesignId?: number;
  dataCollectingMethodId?: number;
  sampleSizeId?: number;
  inclusionCriteria?: string;
  exclusiveCriteria?: string;
  samplingMethodId?: number;
  startSamplingTime?: Date;
  endSamplingTime?: Date;
  costTypeId?: number
  costComponentId?: number;
  studyPerspectiveId?: number;
  qualitativeTableId?: number
  quantitativeTableId?: number
  costTableId?: number
  qualitativeFactorTableId?: number
  quantitativeFactorTableId?: number
}