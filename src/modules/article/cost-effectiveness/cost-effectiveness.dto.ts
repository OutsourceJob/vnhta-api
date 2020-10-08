export class WriteCostEffectivenessDTO {
   articleId: number;
   isActive?: boolean;
   pathologyId?: number;
   icd20Id?: number;
   interventionIdArray?: number[];
   comparatorIdArray?: number[];
   outcomeIdArray?: number[];
   studyLocationIdArray?: number[];
   studyDesignId?: number;
   modelTypeIdArray?: number[];
   assumption?: string;
   analysisMethodId?: number;
   studyPerspectiveId?: number;
   typeOfEffectiveness?: string;
   effectivenessDataCollectingMethodId?: number;
   discountRateId?: number;
   costComponentId?: number;
   costDataCollectingMethod?: string;
   currencyUnitId?: number;
   heterogeneityAnalysisIdArray?: number[];
   uncertaintyAnalysisIdArray?: number[];
   uncertaintyAnalysisResultIdArray?: number[];
   baseCaseTableId?: number;
   sponsor?: string;
}