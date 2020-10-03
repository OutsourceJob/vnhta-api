import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'quality_of_life' })
export class QualityOfLifeEntity extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'article_id' })
  articleId: number;

  @Column()
  pathologyId: string;

  @Column({ name: 'icd_20' })
  icd20: string;

  @Column({ type: 'json' })
  interventions: string[] = [];

  //   @Column({ name: 'studied_location' })
  //   studiedLocation: string[] = [];

  @Column({ name: 'study_design' })
  studyDesign: string;

  @Column({ name: 'data_collecting_method' })
  dataCollectingMethod: string;

  @Column({ name: 'quality_of_life_toolkit' })
  qualityOfLifeToolkit: string;

  @Column({ name: 'sample_size' })
  sampleSize: string;

  @Column({ name: 'inclusion_criteria', type: 'json' })
  inclusionCriteria: string;

  @Column({ name: 'exclusion_criteria', type: 'json' })
  exclusionCriteria: string;

  @Column({ name: 'sampling_method' })
  samplingMethod: string;

  @Column({ name: 'sampling_start_time' })
  samplingStartTime: Date;

  @Column({ name: 'sampling_end_time' })
  samplingEndTime: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
