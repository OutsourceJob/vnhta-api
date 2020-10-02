import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column({ name: 'studied_location' })
  studiedLocation: string[] = [];

  @Column({ name: 'study_design' })
  studyDesign: string; // Here

  @Column({ name: 'data_collecting_method' })
  dataCollectingMethod: string; // here

  @Column({ name: 'quality_of_life_toolkit' })
  qualityOfLifeToolkit: string[] = []; // here

  @Column({ name: 'sample_size' })
  sampleSize: string; // here

  @Column({ name: 'inclusion_criteria', type: 'json' })
  inclusionCriteria: string[] = []; // here

  @Column({ name: 'exclusion_criteria', type: 'json' })
  exclusionCriteria: string[] = []; // here

  @Column({ name: 'sampling_method' }) 
  samplingMethod: string; // here

  @Column({ name: 'sampling_start_time' })
  samplingStartTime: Date;

  @Column({ name: 'sampling_end_time' })
  samplingEndTime: Date; 

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
