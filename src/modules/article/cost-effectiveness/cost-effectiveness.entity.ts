import { ComparatorEntity } from "src/modules/catalog/comparator/comparator.entity";
import { HeterogeneityAnalysisEntity } from "src/modules/catalog/heterogeneity-analysis/heterogeneity-analysis.entity";
import { InterventionEntity } from "src/modules/catalog/intervention/intervention.entity";
import { ModelTypeEntity } from "src/modules/catalog/model-type/model-type.entity";
import { OutcomeEntity } from "src/modules/catalog/outcome/outcome.entity";
import { StudyLocationEntity } from "src/modules/catalog/study-location/study-location.entity";
import { UncertaintyAnalysisResultEntity } from "src/modules/catalog/uncertainty-analysis-result/uncertainty-analysis-result.entity";
import { UncertaintyAnalysisEntity } from "src/modules/catalog/uncertainty-analysis/uncertainty-analysis.entity";
import { BaseEntity, Column, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

export class CostEffectivenessEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "is_active" })
  isActive: boolean = false;

  @Column({ nullable: true })
  pathologyId: string;

  @Column({ nullable: true })
  icd20Id: string;

  @ManyToMany(
    type => InterventionEntity,
    i => i.costEffectiveness
  )
  @JoinTable({
    name: "cost_effectiveness_intervention",
    joinColumns: [{ name: 'cost_effectiveness_id' }],
    inverseJoinColumns: [{ name: "intervention_id" }]
  })
  interventions: InterventionEntity[];

  @Column({ type: 'json' })
  comparators: ComparatorEntity[];

  @Column({ type: 'json' })
  outcomes: OutcomeEntity[];

  @Column({ type: 'json' })
  studyLocations: StudyLocationEntity[];

  @Column({ nullable: true })
  studyDesignId: number;

  @Column({ type: 'json' })
  modelTypes: ModelTypeEntity[];

  /**
  * @todo Model states
  * @todo Model cycle
  * @todo Time horizon
  */

  @Column({ nullable: true })
  assumption: string;

  @Column({ nullable: true })
  analysisMethodId: number;

  @Column({ nullable: true })
  studyPerspectiveId: number;

  @Column({ nullable: true })
  typeOfEffectiveness: string;

  @Column({ nullable: true })
  effectivenessDataCollectingMethodId: number;

  @Column({ nullable: true })
  discountRateId: number;

  @Column({ nullable: true })
  costComponentId: number;

  @Column({ nullable: true })
  costDataCollectingMethod: string;

  @Column({ nullable: true })
  currencyUnitId: number;

  @Column({ nullable: true })
  discountRate: number;

  @Column({ type: 'json' })
  heterogeneityAnalysis: HeterogeneityAnalysisEntity[];

  @Column({ type: 'json' })
  uncertaintyAnalysis: UncertaintyAnalysisEntity[];

  @Column({ type: 'json' })
  uncertaintyAnalysisResults: UncertaintyAnalysisResultEntity[];

  @Column({ nullable: true })
  sponsor: string;
}