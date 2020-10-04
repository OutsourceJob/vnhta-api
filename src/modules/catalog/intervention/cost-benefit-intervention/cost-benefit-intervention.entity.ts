import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: "cost_benefit_intervention" })
export class CostBenefitIntervention extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "intervention_id" })
  interventionId: number;

  @Column({ name: "cost_benefit_id" })
  costBenefitId: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: number;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: number;
}