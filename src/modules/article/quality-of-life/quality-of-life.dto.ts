export class WriteQualityOfLifeDTO {
   isActive?: boolean;
   articleId: number;
   pathologyId?: number;
   icd20IdArray?: number[];
   interventionIdArray?: number[];
   studyLocationIdArray?: number[];
   studyDesignId?: number;
   dataCollectingMethodId?: number;
   qualityOfLifeToolkit?: string;
   sampleSizeId?: number;
   samplingMethodId?: number;
   inclusionCriteria?: string;
   exclusionCriteria?: string;
   startSamplingTime?: Date;
   endSamplingTime?: Date;
}