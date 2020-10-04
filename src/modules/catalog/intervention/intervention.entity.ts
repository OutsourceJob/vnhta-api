import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { CostBenefitInterventionEntity } from './cost-benefit-intervention/cost-benefit-intervention.entity';

@Entity({ name: "intervention" })
export class InterventionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date

  // relations
  @ManyToOne(
    type => CostBenefitInterventionEntity,
    e => e.interventionId,
    { onDelete: "SET NULL" }
  )
  costBenefitInterventions: CostBenefitInterventionEntity[]
}