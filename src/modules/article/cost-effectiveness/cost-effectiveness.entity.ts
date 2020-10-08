import { AnalysisMethodEntity } from "src/modules/catalog/analysis-method/analysis-method.entity";
import { ComparatorEntity } from "src/modules/catalog/comparator/comparator.entity";
import { CostComponentEntity } from "src/modules/catalog/cost-component/cost-component.entity";
import { CurrencyUnitEntity } from "src/modules/catalog/currency-unit/currency-unit.entity";
import { DiscountRateEntity } from "src/modules/catalog/discount-rate/discount-rate.entity";
import { EffectivenessDataCollectingMethodEntity } from "src/modules/catalog/effectiveness-data-collecting-method/effectiveness-data-collecting-method.entity";
import { HeterogeneityAnalysisEntity } from "src/modules/catalog/heterogeneity-analysis/heterogeneity-analysis.entity";
import { Icd20Entity } from "src/modules/catalog/icd-20/icd-20.entity";
import { InterventionEntity } from "src/modules/catalog/intervention/intervention.entity";
import { ModelTypeEntity } from "src/modules/catalog/model-type/model-type.entity";
import { OutcomeEntity } from "src/modules/catalog/outcome/outcome.entity";
import { PathologyEntity } from "src/modules/catalog/pathology/pathology.entity";
import { StudyDesignEntity } from "src/modules/catalog/study-design/study-design.entity";
import { StudyLocationEntity } from "src/modules/catalog/study-location/study-location.entity";
import { StudyPerspectiveEntity } from "src/modules/catalog/study-perspective/study-perspective.entity";
import { UncertaintyAnalysisResultEntity } from "src/modules/catalog/uncertainty-analysis-result/uncertainty-analysis-result.entity";
import { UncertaintyAnalysisMethodEntity } from "src/modules/catalog/uncertainty-analysis-method/uncertainty-analysis-method.entity";
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ArticleEntity } from "../article.entity";
import { TableEntity } from '../../catalog/table/table.entity';

@Entity({ name: 'cost_effectiveness' })
export class CostEffectivenessEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "is_active" })
  isActive: boolean = false;

  @OneToOne(
    type => ArticleEntity,
    a => a.costEffectiveness,
    { onDelete: "CASCADE" }
  )
  @JoinColumn({ name: 'article_id' })
  articleId: number;

  @ManyToOne(
    type => PathologyEntity,
    p => p.costEffectiveness,
    { onDelete: "SET NULL" }
  )
  @JoinColumn({ name: 'pathology_id' })
  @Column({ name: "pathology_id", nullable: true })
  pathologyId: number;

  @ManyToOne(
    type => Icd20Entity,
    i => i.costEffectiveness
  )
  @JoinColumn({ name: 'icd20_id' })
  @Column({ name: 'icd20_id', nullable: true })
  icd20Id: number;

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

  @ManyToMany(type => ComparatorEntity, c => c.costEffectiveness)
  @JoinTable({
    name: "cost_effectiveness_comparator",
    joinColumns: [{ name: 'cost_effectiveness_id' }],
    inverseJoinColumns: [{ name: 'comparator_id' }]
  })
  comparators: ComparatorEntity[];

  // @ManyToMany(
  //   type => OutcomeEntity,
  //   o => o.costEffectiveness
  // )
  // @JoinTable({
  //   name: "cost_effectiveness_outcome",
  //   joinColumns: [{ name: 'cost_effectiveness_id' }],
  //   inverseJoinColumns: [{ name: "outcome_id" }]
  // })
  @Column({ type: "json" })
  outcomes: OutcomeEntity[] = [];

  @ManyToMany(
    type => StudyLocationEntity,
    s => s.costEffectiveness
  )
  @JoinTable({
    name: "cost_effectiveness_study_location",
    joinColumns: [{ name: 'cost_effectiveness_id' }],
    inverseJoinColumns: [{ name: "study_location_id" }]
  })
  studyLocations: StudyLocationEntity[];

  // @ManyToOne(
  //   type => StudyDesignEntity,
  //   s => s.costEffectiveness,
  //   { onDelete: "SET NULL" }
  // )
  // @JoinColumn({ name: 'study_design_id' })
  @Column({ name: 'ce_study_design_id', nullable: true })
  ceStudyDesignId: number;

  // @ManyToMany(
  //   type => ModelTypeEntity,
  //   m => m.costEffectiveness
  // )
  // @JoinTable({
  //   name: "cost_effectiveness_model_type",
  //   joinColumns: [{ name: 'cost_effectiveness_id' }],
  //   inverseJoinColumns: [{ name: "model_type_id" }]
  // })
  @Column({ type: "json" })
  modelTypes: ModelTypeEntity[] = [];

  /**
  @todo Model states
  */
  @Column({ nullable: true })
  modelStates: string;

  /**
  @todo Model cycle
  */
  @Column({ name: 'model_cycle_quantity', nullable: true })
  modelCycleQuantity: number;

  @Column({ name: 'model_cycle_unit_id', nullable: true })
  modelCycleUnitId: number;

  /**
  @todo Time horizon
  */

  @Column({ name: 'time_horizon_quantity', nullable: true })
  timeHorizonQuantity: number;

  @Column({ name: 'time_horizon_unit_id', nullable: true })
  timeHorizonUnitId: number;

  @Column({ nullable: true })
  assumption: string;

  // @ManyToOne(
  //   type => AnalysisMethodEntity,
  //   a => a.costEffectiveness,
  //   { onDelete: "SET NULL" }
  // )
  // @JoinColumn({ name: "analysis_method_id" })
  @Column({ name: 'analysis_method_id', nullable: true })
  analysisMethodId: number;

  // @ManyToOne(
  //   type => StudyPerspectiveEntity,
  //   s => s.costEffectiveness,
  //   { onDelete: "SET NULL" }
  // )
  // @JoinColumn({ name: "study_perspective_id" })
  @Column({ name: 'study_perspective_id', nullable: true })
  studyPerspectiveId: number;

  @Column({ name: 'type_of_effectiveness_id', nullable: true })
  typeOfEffectivenessId: number;

  @Column({ name: 'clinical_criteria', nullable: true })
  clinicalCriteria: string;

  // @ManyToOne(
  //   type => EffectivenessDataCollectingMethodEntity,
  //   e => e.costEffectiveness,
  //   { onDelete: "SET NULL" }
  // )
  // @JoinColumn({ name: 'effectiveness_data_collecting_method_id' })
  @Column({ name: "effectiveness_data_collecting_method_id", nullable: true })
  effectivenessDataCollectingMethodId: number;

  @ManyToOne(
    type => DiscountRateEntity,
    d => d.costEffectiveness
  )
  @JoinColumn({ name: 'discount_rate_id' })
  @Column({ name: "discount_rate_id", nullable: true })
  discountRateId: number;

  // @ManyToOne(
  //   type => CostComponentEntity,
  //   c => c.costEffectiveness,
  //   { onDelete: "SET NULL" }
  // )
  // @JoinColumn({ name: 'cost_component_id' })
  @Column({ name: 'cost_component_id', nullable: true })
  costComponentId: number;

  @Column({ name: 'cost_data_collecting_method_id', nullable: true })
  costDataCollectingMethodId: number;

  // @ManyToOne(
  //   type => CurrencyUnitEntity,
  //   c => c.costEffectiveness,
  //   { onDelete: "SET NULL" }
  // )
  // @JoinColumn({ name: 'currency_unit_id' })
  @Column({ name: 'currency_unit_id', nullable: true })
  currencyUnitId: string;

  @Column({ name: 'year_of_cost', nullable: true })
  yearOfCost: number;

  // @ManyToMany(
  //   type => HeterogeneityAnalysisEntity,
  //   h => h.costEffectiveness
  // )
  // @JoinTable({
  //   name: "cost_effectiveness_heterogeneity_analysis",
  //   joinColumns: [{ name: 'cost_effectiveness_id' }],
  //   inverseJoinColumns: [{ name: "heterogeneity_analysis_id" }]
  // })
  @Column({ type: "json" })
  heterogeneityAnalysis: HeterogeneityAnalysisEntity[] = [];

  // @ManyToMany(
  //   type => UncertaintyAnalysisMethodEntity,
  //   u => u.costEffectiveness
  // )
  // @JoinTable({
  //   name: "cost_effectiveness_uncertainty_analysis",
  //   joinColumns: [{ name: 'cost_effectiveness_id' }],
  //   inverseJoinColumns: [{ name: "uncertainty_analysis_id" }]
  // })
  @Column({ type: "json" })
  uncertaintyAnalysisMethods: UncertaintyAnalysisMethodEntity[] = [];

  // @ManyToMany(
  //   type => UncertaintyAnalysisResultEntity,
  //   u => u.costEffectiveness
  // )
  // @JoinTable({
  //   name: "cost_effectiveness_uncertainty_analysis_result",
  //   joinColumns: [{ name: 'cost_effectiveness_id' }],
  //   inverseJoinColumns: [{ name: "uncertainty_analysis_result_id" }]
  // })
  @Column({ type: "json" })
  uncertaintyAnalysisResults: UncertaintyAnalysisResultEntity[] = [];

  @ManyToOne(
    type => TableEntity
  )
  @JoinColumn({ name: "base_case_table_id", referencedColumnName: "id" })
  @Column({ name: "base_case_table_id", nullable: true })
  baseCaseTableId: number;

  @Column({ nullable: true })
  sponsor: string;

  @CreateDateColumn({
    name: "created_at"
  })
  createdAt: Date

  @UpdateDateColumn({
    name: "updated_at"
  })
  updatedAt: Date;
}