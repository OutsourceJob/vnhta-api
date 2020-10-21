export class WriteCostBenefitDTO {
  articleId: number;
  pathologyId?: number;
  icd20IdArray?: number[];
  interventionIdArray?: number[];
  studyLocationIdArray?: number[];
  studyDesignId?: number;
  dataCollectingMethodIdArray?: number[];
  sampleSizeId?: number;
  inclusionCriteria?: string;
  exclusiveCriteria?: string;
  samplingMethodId?: number;
  startSamplingTime?: Date;
  endSamplingTime?: Date;
  costTypeId?: number
  costComponentIdArray?: number[];
  studyPerspectiveId?: number;
  qualitativeTableId?: number
  quantitativeTableId?: number
  costTableId?: number
  qualitativeFactorTableId?: number
  quantitativeFactorTableId?: number
}