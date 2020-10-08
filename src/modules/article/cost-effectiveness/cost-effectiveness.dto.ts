export class WriteCostEffectivenessDTO {
   articleId: number;
   isActive?: boolean;
   pathologyId?: number;
   icd20Id?: number;
   interventionIdArray?: number[];
   comparatorIdArray?: number[];
   outcomeIdArray?: number[];
   studyLocationIdArray?: number[];
   ceStudyDesignId?: number;
   modelTypeIdArray?: number[];
   modelStates?: string;
   modelCycleQuantity?: number;
   modelCycleUnitId?: number;
   timeHorizonQuantity?: number;
   timeHorizonUnitId?: number;
   assumption?: string;
   analysisMethodId?: number;
   studyPerspectiveId?: number;
   typeOfEffectiveness?: string;
   clinicalCriteria?: string;
   effectivenessDataCollectingMethodId?: number;
   discountRateId?: number;
   costComponentId?: number;
   costDataCollectingMethod?: string;
   currencyUnitId?: number;
   yearOfCost?: number;
   heterogeneityAnalysisIdArray?: number[];
   uncertaintyAnalysisMethodIdArray?: number[];
   uncertaintyAnalysisResultIdArray?: number[];
   baseCaseTableId?: number;
   sponsor?: string;
}