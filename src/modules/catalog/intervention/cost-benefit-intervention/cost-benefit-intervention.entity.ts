import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { InterventionEntity } from '../intervention.entity';
import { CostBenefitEntity } from '../../../article/cost-benefit/cost-benefit.entity';

@Entity({ name: "cost_benefit_intervention" })
export class CostBenefitInterventionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => InterventionEntity
  )
  @JoinColumn({ name: "intervention_id" })
  interventionId: number;

  @ManyToOne(
    type => CostBenefitEntity
  )
  @JoinColumn({ name: "cost_benefit_id" })
  costBenefitId: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: number;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: number;
}