import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { PathologyEntity } from '../../catalog/pathology/pathology.entity';
import { Icd20Entity } from '../../catalog/icd-20/icd-20.entity';
import { StudyLocationEntity } from '../../catalog/study-location/study-location.entity';
import { InterventionEntity } from '../../catalog/intervention/intervention.entity';

@Entity({ name: "cost_benefit" })
export class CostBenefitEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "is_active" })
  isActive: boolean = false;

  @Column({ name: "article_id" })
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
    // e => e.costBenefits
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

  @Column({ name: "study_design_id", nullable: true })
  studyDesignId: number;

  @Column({ name: "data_collecting_method_id", nullable: true })
  dataCollectingMethodId: number;

  @Column({ name: "sample_size_id", nullable: true })
  sampleSizeId: number;

  @Column({ name: "inclusion_criteria", nullable: true })
  inclusionCriteria: string;

  @Column({ name: "exclusive_criteria", nullable: true })
  exclusiveCriteria: string;

  @Column({ name: "sampling_method_id", nullable: true })
  samplingMethodId: number;

  @Column({ name: "start_sampling_time", nullable: true })
  startSamplingTime: Date;

  @Column({ name: "end_sampling_time", nullable: true })
  endSamplingTime: Date;

  @Column({ name: "cost_type_id", nullable: true })
  costTypeId: number;

  @Column({ name: "cost_component_id", nullable: true })
  costComponentId: string;

  @Column({ name: "study_perspective_id", nullable: true })
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