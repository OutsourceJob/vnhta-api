import { Icd20Entity } from 'src/modules/catalog/icd-20/icd-20.entity';
import { PathologyEntity } from 'src/modules/catalog/pathology/pathology.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'quality_of_life' })
export class QualityOfLifeEntity extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column({ name: "is_active" })
  isActive: boolean = false;

  @Column({ name: 'article_id' })
  articleId: number;

  @ManyToOne(
    type => PathologyEntity,
    p => p.qualityOfLives,
  )
  @JoinColumn({ name: 'pathology_id' })
  pathologyId: string;

  @ManyToOne(
    type => Icd20Entity,
    i => i.qualityOfLives,
    {
      onDelete: 'SET NULL',
    },
  )
  @JoinColumn({ name: 'icd20_id' })
  icd20Id: number;

  @Column({ type: 'json' })
  interventions: string[] = [];

  @Column({ name: 'studied_location', type: 'json' })
  studiedLocation: string[] = [];

  @Column({ name: 'study_design' })
  studyDesign: string; // here

  @Column({ name: 'data_collecting_method' })
  dataCollectingMethod: string; // here

  @Column({ name: 'quality_of_life_toolkit' })
  qualityOfLifeToolkit: string;

  @Column({ name: 'sample_size' })
  sampleSize: string; // here

  @Column({ name: 'inclusion_criteria', type: 'json' })
  inclusionCriteria: string;

  @Column({ name: 'exclusion_criteria', type: 'json' })
  exclusionCriteria: string;

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
