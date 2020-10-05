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
  articleId: number

  @ManyToOne(
    type => PathologyEntity,
  )
  @JoinColumn({ name: "pathology_id" })
  @Column({ nullable: true })
  pathologyId: string;

  @ManyToOne(
    type => Icd20Entity
  )
  @JoinColumn({ name: "icd_20_id" })
  @Column({ nullable: true })
  icd20Id: string;

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

  @ManyToOne(
    type => StudyDesignEntity,
    { onDelete: "SET NULL" }
  )
  @JoinColumn({ name: "study_design_id" })
  @Column({ nullable: true })
  studyDesignId: number;

  @ManyToOne(
    type => DataCollectingMethodEntity,
    { onDelete: "SET NULL" }
  )
  @Column({ name: "data_collecting_method_id", nullable: true })
  dataCollectingMethodId: number;

  @ManyToOne(
    type => SampleSizeEntity,
    { onDelete: "SET NULL" }
  )
  @Column({ name: "sample_size_id", nullable: true })
  sampleSizeId: number;

  @Column({ name: "inclusion_criteria", nullable: true })
  inclusionCriteria: string;

  @Column({ name: "exclusive_criteria", nullable: true })
  exclusiveCriteria: string;

  @ManyToOne(
    type => SamplingMethodEntity,
    { onDelete: "SET NULL" }
  )
  @JoinColumn({ name: "sampling_method_id" })
  @Column({ nullable: true })
  samplingMethodId: number;

  @Column({ name: "start_sampling_time", nullable: true })
  startSamplingTime: Date;

  @Column({ name: "end_sampling_time", nullable: true })
  endSamplingTime: Date;

  @ManyToOne(
    type => CostTypeEntity,
    { onDelete: "SET NULL" }
  )
  @JoinColumn({ name: "cost_type_id" })
  @Column({ nullable: true })
  costTypeId: number;

  @ManyToOne(
    type => CostComponentEntity,
    { onDelete: "SET NULL" }
  )
  @JoinColumn({ name: "cost_component_id" })
  @Column({ nullable: true })
  costComponentId: string;

  @ManyToOne(
    type => StudyPerspectiveEntity,
    { onDelete: "SET NULL" }
  )
  @JoinColumn({ name: "study_perspective_id" })
  @Column({ nullable: true })
  studyPerspectiveId: number;

  @CreateDateColumn({
    name: "created_at"
  })
  createdAt: Date

  @UpdateDateColumn({
    name: "updated_at"
  })
  updatedAt: Date;
}