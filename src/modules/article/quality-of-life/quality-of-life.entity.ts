import { DataCollectingMethodEntity } from 'src/modules/catalog/data-collecting-method/data-collecting-method.entity';
import { Icd20Entity } from 'src/modules/catalog/icd-20/icd-20.entity';
import { InterventionEntity } from 'src/modules/catalog/intervention/intervention.entity';
import { PathologyEntity } from 'src/modules/catalog/pathology/pathology.entity';
import { SampleSizeEntity } from 'src/modules/catalog/sample-size/sample-size.entity';
import { SamplingMethodEntity } from 'src/modules/catalog/sampling-method/sampling-method.entity';
import { StudyDesignEntity } from 'src/modules/catalog/study-design/study-design.entity';
import { StudyLocationEntity } from 'src/modules/catalog/study-location/study-location.entity';
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
  @Column({ nullable: true })
  pathologyId: number;

  @ManyToOne(
    type => Icd20Entity,
    i => i.qualityOfLives,
    {
      onDelete: 'SET NULL',
    },
  )
  @JoinColumn({ name: 'icd20_id' })
  @Column({ nullable: true })
  icd20Id: number;

  @Column({ type: 'json' })
  interventions: InterventionEntity[];

  @Column({ name: 'studied_location', type: 'json' })
  studyLocations: StudyLocationEntity[];

  @ManyToOne(type => StudyDesignEntity, s => s.qualityOfLives, {
    onDelete: "SET NULL"
  })
  @JoinColumn({ name: 'study_design_id' })
  @Column({ nullable: true })
  studyDesignId: number;

  @ManyToOne(type => DataCollectingMethodEntity, d => d.qualityOfLives, {
    onDelete: "SET NULL"
  })
  @JoinColumn({ name: 'data_collecting_method_id' })
  @Column({ nullable: true })
  dataCollectingMethodId: number;

  @Column({ name: 'quality_of_life_toolkit', nullable: true })
  qualityOfLifeToolkit: string;

  @ManyToOne(type => SampleSizeEntity, s => s.qualityOfLives, {
    onDelete: "SET NULL"
  })
  @JoinColumn({ name: 'sample_size_id' })
  @Column({ nullable: true })
  sampleSizeId: number;

  @ManyToOne(type => SamplingMethodEntity, s => s.qualityOfLives, {
    onDelete: "SET NULL"
  })
  @JoinColumn({ name: 'sampling_method_id' })
  @Column({ nullable: true })
  samplingMethodId: number;

  @Column({ name: 'inclusion_criteria', nullable: true })
  inclusionCriteria: string;

  @Column({ name: 'exclusion_criteria', nullable: true })
  exclusionCriteria: string;

  @Column({ name: 'start_sampling_time', nullable: true })
  startSamplingTime: Date;

  @Column({ name: 'end_sampling_time', nullable: true })
  endSamplingTime: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
