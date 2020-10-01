import { Entity, BaseEntity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: "cost_benefit" })
export class CostBenefitEntity extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  pathology: string;

  @Column({ name: "icd_20" })
  icd20: string;

  @Column({ type: "json" })
  interventions: string[] = []

  @Column({ name: "studied_location" })
  studiedLocation: string[] = []

  @Column({ name: "study_design" })
  studyDesign: string;

  @Column({ name: "data_collecting_method" })
  dataCollectingMethod: string;

  @Column({ name: "sample_size" })
  sampleSize: string;

  @Column({ name: "inclusion_criteria", type: "json" })
  inclusionCriteria: string[] = []

  @Column({ name: "exclusion_criteria", type: "json" })
  exclusionCriteria: string[] = []

  @Column({ name: "sampling_method", type: "json" })
  samplingMethod: string[] = []

  @Column({ name: "cost_type" })
  costType: string;


}