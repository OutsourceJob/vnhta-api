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
   typeOfEffectivenessId?: number;
   clinicalCriteria?: string;
   effectivenessDataCollectingMethodId?: number;
   discountRateId?: number;
   costComponentId?: number;
   costDataCollectingMethodId?: number;
   currencyUnitId?: number;
   yearOfCost?: number;
   heterogeneityAnalysisIdArray?: number[];
   uncertaintyAnalysisMethodIdArray?: number[];
   uncertaintyAnalysisResultIdArray?: number[];
   baseCaseTableId?: number;
   sponsor?: string;
}