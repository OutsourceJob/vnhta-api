import { DataCollectingMethodEntity } from 'src/modules/catalog/data-collecting-method/data-collecting-method.entity';
import { Icd20Entity } from 'src/modules/catalog/icd-20/icd-20.entity';
import { InterventionEntity } from 'src/modules/catalog/intervention/intervention.entity';
import { PathologyEntity } from 'src/modules/catalog/pathology/pathology.entity';
import { SampleSizeEntity } from 'src/modules/catalog/sample-size/sample-size.entity';
import { SamplingMethodEntity } from 'src/modules/catalog/sampling-method/sampling-method.entity';
import { StudyDesignEntity } from 'src/modules/catalog/study-design/study-design.entity';
import { StudyLocationEntity } from 'src/modules/catalog/study-location/study-location.entity';
import { ArticleEntity } from '../article.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne, ManyToMany, JoinTable
} from 'typeorm';

@Entity({ name: 'quality_of_life' })
export class QualityOfLifeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "is_active" })
  isActive: boolean = false;

  @OneToOne(
    type => ArticleEntity,
    e => e.qualityOfLife,
    { onDelete: "CASCADE" }
  )
  @JoinColumn({ name: 'article_id' })
  articleId: number;

  @ManyToOne(
    type => PathologyEntity,
    // p => p.qualityOfLives,
    {
      onDelete: "SET NULL"
    }
  )
  @JoinColumn({ name: 'pathology_id' })
  @Column({ name: 'pathology_id', nullable: true })
  pathologyId: number;

  @ManyToOne(
    type => Icd20Entity,
    i => i.qualityOfLives,
    {
      onDelete: 'SET NULL',
    },
  )
  @JoinColumn({ name: 'icd20_id' })
  @Column({ name: 'icd20_id', nullable: true })
  icd20Id: number;

  @ManyToMany(
    type => InterventionEntity,
    i => i.qualityOfLives
  )
  @JoinTable({
    name: "quality_of_life_intervention",
    joinColumns: [{ name: 'quality_of_life_id' }],
    inverseJoinColumns: [{ name: "intervention_id" }]
  })
  interventions: InterventionEntity[];

  @ManyToMany(
    type => StudyLocationEntity,
    s => s.qualityOfLives
  )
  @JoinTable({
    name: "quality_of_life_study_location",
    joinColumns: [{ name: 'quality_of_life_id' }],
    inverseJoinColumns: [{ name: "study_location_id" }]
  })
  studyLocations: StudyLocationEntity[];

  @ManyToOne(type => StudyDesignEntity, s => s.qualityOfLives, {
    onDelete: "SET NULL"
  })
  @JoinColumn({ name: 'study_design_id' })
  @Column({ name: 'study_design_id', nullable: true })
  studyDesignId: number;

  @ManyToOne(type => DataCollectingMethodEntity, d => d.qualityOfLives, {
    onDelete: "SET NULL"
  })
  @JoinColumn({ name: 'data_collecting_method_id' })
  @Column({ name: 'data_collecting_method_id', nullable: true })
  dataCollectingMethodId: number;

  @Column({ name: 'quality_of_life_toolkit', nullable: true })
  qualityOfLifeToolkit: string;

  @ManyToOne(type => SampleSizeEntity, s => s.qualityOfLives, {
    onDelete: "SET NULL"
  })
  @JoinColumn({ name: 'sample_size_id' })
  @Column({ name: 'sample_size_id', nullable: true })
  sampleSizeId: number;

  @ManyToOne(type => SamplingMethodEntity, s => s.qualityOfLives, {
    onDelete: "SET NULL"
  })
  @JoinColumn({ name: 'sampling_method_id' })
  @Column({ name: 'sampling_method_id', nullable: true })
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
