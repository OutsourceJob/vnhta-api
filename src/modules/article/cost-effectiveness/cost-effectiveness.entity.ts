import { ComparatorEntity } from "src/modules/catalog/comparator/comparator.entity";
import { InterventionEntity } from "src/modules/catalog/intervention/intervention.entity";
import { OutcomeEntity } from "src/modules/catalog/outcome/outcome.entity";
import { StudyLocationEntity } from "src/modules/catalog/study-location/study-location.entity";
import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export class CostEffectivenessEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "is_active" })
  isActive: boolean = false;

  @Column({ nullable: true })
  pathologyId: string;

  @Column({ nullable: true })
  icd20Id: string;

  @Column({ type: 'json' })
  interventions: InterventionEntity[];

  @Column({ type: 'json' })
  comparators: ComparatorEntity[];

  @Column({ type: 'json' })
  outcomes: OutcomeEntity[];

  @Column({ type: 'json' })
  studyLocations: StudyLocationEntity[];

  @Column({ nullable: true })
  studyDesignId: number;


}