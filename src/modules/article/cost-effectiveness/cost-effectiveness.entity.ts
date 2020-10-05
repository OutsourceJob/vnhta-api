import { ComparatorEntity } from "src/modules/catalog/comparator/comparator.entity";
import { HeterogeneityAnalysisEntity } from "src/modules/catalog/heterogeneity-analysis/heterogeneity-analysis.entity";
import { InterventionEntity } from "src/modules/catalog/intervention/intervention.entity";
import { ModelTypeEntity } from "src/modules/catalog/model-type/model-type.entity";
import { OutcomeEntity } from "src/modules/catalog/outcome/outcome.entity";
import { StudyLocationEntity } from "src/modules/catalog/study-location/study-location.entity";
import { UncertaintyAnalysisResultEntity } from "src/modules/catalog/uncertainty-analysis-result/uncertainty-analysis-result.entity";
import { UncertaintyAnalysisEntity } from "src/modules/catalog/uncertainty-analysis/uncertainty-analysis.entity";
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ArticleEntity } from "../article.entity";

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

  @ManyToMany(type => ComparatorEntity, c => c.costEffectiveness)
  @JoinTable({
    name: "cost_effectiveness_comparator",
    joinColumns: [{ name: 'cost_effectiveness_id' }],
    inverseJoinColumns: [{ name: 'comparator_id' }]
  })
  comparators: ComparatorEntity[];

  @ManyToMany(
    type => OutcomeEntity,
    o => o.costEffectiveness
  )
  @JoinTable({
    name: "cost_effectiveness_outcome",
    joinColumns: [{ name: 'cost_effectiveness_id' }],
    inverseJoinColumns: [{ name: "outcome_id" }]
  })
  outcomes: OutcomeEntity[];

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

  @Column({ nullable: true })
  studyDesignId: number;

  @ManyToMany(
    type => ModelTypeEntity,
    m => m.costEffectiveness
  )
  @JoinTable({
    name: "cost_effectiveness_model_type",
    joinColumns: [{ name: 'cost_effectiveness_id' }],
    inverseJoinColumns: [{ name: "model_type_id" }]
  })
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

  @ManyToMany(
    type => HeterogeneityAnalysisEntity,
    h => h.costEffectiveness
  )
  @JoinTable({
    name: "cost_effectiveness_heterogeneity_analysis",
    joinColumns: [{ name: 'cost_effectiveness_id' }],
    inverseJoinColumns: [{ name: "heterogeneity_analysis_id" }]
  })
  heterogeneityAnalysis: HeterogeneityAnalysisEntity[];

  @ManyToMany(
    type => UncertaintyAnalysisEntity,
    u => u.costEffectiveness
  )
  @JoinTable({
    name: "cost_effectiveness_uncertainty_analysis",
    joinColumns: [{ name: 'cost_effectiveness_id' }],
    inverseJoinColumns: [{ name: "uncertainty_analysis_id" }]
  })
  uncertaintyAnalysis: UncertaintyAnalysisEntity[];

  @ManyToMany(
    type => UncertaintyAnalysisResultEntity,
    u => u.costEffectiveness
  )
  @JoinTable({
    name: "cost_effectiveness_uncertainty_analysis_result",
    joinColumns: [{ name: 'cost_effectiveness_id' }],
    inverseJoinColumns: [{ name: "uncertainty_analysis_result_id" }]
  })
  uncertaintyAnalysisResults: UncertaintyAnalysisResultEntity[];

  @Column({ nullable: true })
  sponsor: string;
}