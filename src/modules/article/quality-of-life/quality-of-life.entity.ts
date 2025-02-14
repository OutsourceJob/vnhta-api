import { Icd20Entity } from 'src/modules/catalog/icd-20/icd-20.entity';
import { InterventionEntity } from 'src/modules/catalog/intervention/intervention.entity';
import { PathologyEntity } from 'src/modules/catalog/pathology/pathology.entity';
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
import { TableEntity } from 'src/modules/catalog/table/table.entity';

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
  @Column({ name: "article_id", nullable: true })
  articleId: number;

  @ManyToOne(
    type => PathologyEntity,
    p => p.qualityOfLives,
    {
      onDelete: "SET NULL"
    }
  )
  @JoinColumn({ name: 'pathology_id' })
  @Column({ name: 'pathology_id', nullable: true })
  pathologyId: number;

  @ManyToMany(
    type => Icd20Entity,
    i => i.qualityOfLives
  )
  @JoinTable({
    name: 'quality_of_life_icd_20',
    joinColumns: [{ name: 'quality_of_life_id' }],
    inverseJoinColumns: [{ name: "icd_20_id" }]
  })
  icd20s: Icd20Entity[];

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

  // @ManyToOne(type => StudyDesignEntity, s => s.qualityOfLives, {
  //   onDelete: "SET NULL"
  // })
  // @JoinColumn({ name: 'study_design_id' })
  @Column({ name: 'ql_study_design_id', nullable: true })
  qlStudyDesignId: number;

  // @ManyToOne(type => DataCollectingMethodEntity, d => d.qualityOfLives, {
  //   onDelete: "SET NULL"
  // })
  // @JoinColumn({ name: 'data_collecting_method_id' })
  @Column({ name: 'data_collecting_method_id_array', type: "json" })
  dataCollectingMethodIdArray: number[] = [];

  @Column({ name: 'quality_of_life_toolkit', nullable: true, type: "longtext" })
  qualityOfLifeToolkit: string;

  // @ManyToOne(type => SampleSizeEntity, s => s.qualityOfLives, {
  //   onDelete: "SET NULL"
  // })
  // @JoinColumn({ name: 'sample_size_id' })
  @Column({ name: 'sample_size_id', nullable: true })
  sampleSizeId: number;

  @Column({ name: 'inclusion_criteria', nullable: true, type: "longtext" })
  inclusionCriteria: string;

  @Column({ name: 'exclusion_criteria', nullable: true, type: "longtext" })
  exclusionCriteria: string;

  // @ManyToOne(type => SamplingMethodEntity, s => s.qualityOfLives, {
  //   onDelete: "SET NULL"
  // })
  // @JoinColumn({ name: 'sampling_method_id' })
  @Column({ name: 'sampling_method_id', nullable: true })
  samplingMethodId: number;

  @Column({ name: 'start_sampling_time', nullable: true })
  startSamplingTime: Date;

  @Column({ name: 'end_sampling_time', nullable: true })
  endSamplingTime: Date;

  @Column({ name: 'real_world_sample_size', nullable: true })
  realWorldSampleSize: number;


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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
