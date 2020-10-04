import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { PathologyEntity } from '../../catalog/pathology/pathology.entity';
import { Icd20Entity } from '../../catalog/icd-20/icd-20.entity';

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
  pathologyId: string;

  @ManyToOne(
    type => Icd20Entity
  )
  @JoinColumn({ name: "icd_20_id" })
  icd20Id: string;

  // interventions

  // @Column({ name: "study_location_id" })
  // studyLocationId: number;

  @Column({ name: "study_design_id" })
  studyDesignId: number;

  @Column({ name: "data_collecting_method_id" })
  dataCollectingMethodID: number;

  @Column({ name: "sample_size_id" })
  sampleSizeId: number;

  @Column({ name: "inclusion_criteria" })
  inclusionCriteria: string;

  @Column({ name: "exclusive_criteria" })
  exclusiveCriteria: string;

  @Column({ name: "sampling_method_id" })
  samplingMethodId: number;

  @Column({ name: "start_sampling_time" })
  startSamplingTime: Date;

  @Column({ name: "end_sampling_time" })
  endSamplingTime: Date;

  @Column({ name: "cost_type" })
  costType: string;

  @Column({ name: "cost_component_id" })
  costComponentId: string;

  @Column({ name: "study_perspective_id" })
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