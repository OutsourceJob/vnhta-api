import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, ManyToMany, JoinTable, OneToOne } from 'typeorm';
import { PathologyEntity } from '../../catalog/pathology/pathology.entity';
import { Icd20Entity } from '../../catalog/icd-20/icd-20.entity';
import { StudyLocationEntity } from '../../catalog/study-location/study-location.entity';
import { InterventionEntity } from '../../catalog/intervention/intervention.entity';
import { ArticleEntity } from '../article.entity';
import { StudyDesignEntity } from '../../catalog/study-design/study-design.entity';
import { DataCollectingMethodEntity } from '../../catalog/data-collecting-method/data-collecting-method.entity';
import { SampleSizeEntity } from '../../catalog/sample-size/sample-size.entity';
import { SamplingMethodEntity } from '../../catalog/sampling-method/sampling-method.entity';
import { CostTypeEntity } from 'src/modules/catalog/cost-type/cost-type.entity';
import { CostComponentEntity } from '../../catalog/cost-component/cost-component.entity';
import { StudyPerspectiveEntity } from '../../catalog/study-perspective/study-perspective.entity';
import { TableEntity } from '../../catalog/table/table.entity';

@Entity({ name: "cost_benefit" })
export class CostBenefitEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "is_active" })
  isActive: boolean = false;

  @OneToOne(
    type => ArticleEntity,
    e => e.costBenefit,
    { onDelete: "CASCADE" }
  )
  @JoinColumn({ name: "article_id" })
  @Column({ name: "article_id", nullable: true })
  articleId: number

  @ManyToOne(
    type => PathologyEntity,
  )
  @JoinColumn({ name: "pathology_id" })
  @Column({ name: "pathology_id", nullable: true })
  pathologyId: number;

  @ManyToOne(
    type => Icd20Entity
  )
  @JoinColumn({ name: "icd_20_id" })
  @Column({ name: "icd_20_id", nullable: true })
  icd20Id: number;

  @ManyToMany(
    type => InterventionEntity,
    e => e.costBenefits
  )
  @JoinTable({
    name: "cost_benefit_intervention",
    joinColumns: [{ name: "cost_benefit_id" }],
    inverseJoinColumns: [{ name: "intervention_id" }]
  })
  interventions: InterventionEntity[]

  @ManyToMany(
    type => StudyLocationEntity,
    e => e.costBenefits
  )
  @JoinTable({
    name: "cost_benefit_study_location",
    joinColumns: [
      { name: "cost_benefit_id" },
    ],
    inverseJoinColumns: [
      { name: "study_location_id" },
    ]
  })
  studyLocations: StudyLocationEntity[]

  // @ManyToOne(
  //   type => StudyDesignEntity,
  //   { onDelete: "SET NULL" }
  // )
  // @JoinColumn({ name: "study_design_id" })
  @Column({ name: "study_design_id", nullable: true })
  studyDesignId: number;

  // @ManyToOne(
  //   type => DataCollectingMethodEntity,
  //   { onDelete: "SET NULL" }
  // )
  // @JoinColumn({ name: "data_collecting_method_id" })
  // @Column({ name: "data_collecting_method_id", nullable: true })
  dataCollectingMethodId: number;

  // @ManyToOne(
  //   type => SampleSizeEntity,
  //   { onDelete: "SET NULL" }
  // )
  // @JoinColumn({ name: "sample_size_id" })
  @Column({ name: "sample_size_id", nullable: true })
  sampleSizeId: number;

  @Column({ name: "inclusion_criteria", nullable: true })
  inclusionCriteria: string;

  @Column({ name: "exclusive_criteria", nullable: true })
  exclusiveCriteria: string;

  // @ManyToOne(
  //   type => SamplingMethodEntity,
  //   { onDelete: "SET NULL" }
  // )
  // @JoinColumn({ name: "sampling_method_id" })
  @Column({ name: "sampling_method_id", nullable: true })
  samplingMethodId: number;

  @Column({ name: "start_sampling_time", nullable: true })
  startSamplingTime: Date;

  @Column({ name: "end_sampling_time", nullable: true })
  endSamplingTime: Date;

  // @ManyToOne(
  //   type => CostTypeEntity,
  //   { onDelete: "SET NULL" }
  // )
  // @JoinColumn({ name: "cost_type_id" })
  @Column({ name: "cost_type_id", nullable: true })
  costTypeId: number;

  // @ManyToOne(
  //   type => CostComponentEntity,
  //   { onDelete: "SET NULL" }
  // )
  // @JoinColumn({ name: "cost_component_id" })
  @Column({ name: "cost_component_id", nullable: true })
  costComponentId: string;

  // @ManyToOne(
  //   type => StudyPerspectiveEntity,
  //   { onDelete: "SET NULL" }
  // )
  // @JoinColumn({ name: "study_perspective_id" })
  @Column({ name: "study_perspective_id", nullable: true })
  studyPerspectiveId: number;


  // tables
  @ManyToOne(
    type => TableEntity,
    { onDelete: "SET NULL" }
  )
  @JoinColumn({ name: "qualitative_table_id", referencedColumnName: "id" })
  @Column({ name: "qualitative_table_id", nullable: true })
  qualitativeTableId: number;

  @ManyToOne(
    type => TableEntity,
    { onDelete: "SET NULL" }
  )
  @JoinColumn({ name: "quantitative_table_id", referencedColumnName: "id" })
  @Column({ name: "quantitative_table_id", nullable: true })
  quantitativeTableId: number;

  @ManyToOne(
    type => TableEntity,
    { onDelete: "SET NULL" }
  )
  @JoinColumn({ name: "cost_table_id", referencedColumnName: "id" })
  @Column({ name: "cost_table_id", nullable: true })
  costTableId: number;

  @ManyToOne(
    type => TableEntity,
    { onDelete: "SET NULL" }
  )
  @JoinColumn({ name: "qualitative_factor_table_id", referencedColumnName: "id" })
  @Column({ name: "qualitative_factor_table_id", nullable: true })
  qualitativeFactorTableId: number;

  @ManyToOne(
    type => TableEntity,
    { onDelete: "SET NULL" }
  )
  @JoinColumn({ name: "quantitative_factor_table_id", referencedColumnName: "id" })
  @Column({ name: "quantitative_factor_table_id", nullable: true })
  quantitativeFactorTableId: number;

  @CreateDateColumn({
    name: "created_at"
  })
  createdAt: Date

  @UpdateDateColumn({
    name: "updated_at"
  })
  updatedAt: Date;
}