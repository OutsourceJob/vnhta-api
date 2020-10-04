import { DataCollectingMethodEntity } from 'src/modules/catalog/data-collecting-method/data-collecting-method.entity';
import { Icd20Entity } from 'src/modules/catalog/icd-20/icd-20.entity';
import { PathologyEntity } from 'src/modules/catalog/pathology/pathology.entity';
import { SampleSizeEntity } from 'src/modules/catalog/sample-size/sample-size.entity';
import { SamplingMethodEntity } from 'src/modules/catalog/sampling-method/sampling-method.entity';
import { StudyDesignEntity } from 'src/modules/catalog/study-design/study-design.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'quality_of_life' })
export class QualityOfLifeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "is_active" })
  isActive: boolean = false;

  @Column({ name: 'article_id' })
  articleId: number;

  @ManyToOne(
    type => PathologyEntity,
    p => p.qualityOfLives,
    {
      onDelete: "SET NULL"
    }
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

  @ManyToOne(type => StudyDesignEntity, s => s.qualityOfLives, {
    onDelete: "SET NULL"
  })
  @JoinColumn({ name: 'study_design_id' })
  studyDesignId: number;

  @ManyToOne(type => DataCollectingMethodEntity, d => d.qualityOfLives, {
    onDelete: "SET NULL"
  })
  @JoinColumn({ name: 'data_collecting_method_id' })
  dataCollectingMethodId: number;

  @Column({ name: 'quality_of_life_toolkit' })
  qualityOfLifeToolkit: string;

  @ManyToOne(type => SampleSizeEntity, s => s.qualityOfLives, {
    onDelete: "SET NULL"
  })
  @JoinColumn({ name: 'sample_size_id' })
  sampleSizeId: number;

  @ManyToOne(type => SamplingMethodEntity, s => s.qualityOfLives, {
    onDelete: "SET NULL"
  })
  @JoinColumn({ name: 'sampling_method_id' })
  samplingMethodId: number;

  @Column({ name: 'inclusion_criteria', type: 'json' })
  inclusionCriteria: string;

  @Column({ name: 'exclusion_criteria', type: 'json' })
  exclusionCriteria: string;

  @Column({ name: 'sampling_start_time' })
  samplingStartTime: Date;

  @Column({ name: 'sampling_end_time' })
  samplingEndTime: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
