import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { CostBenefitEntity } from '../../article/cost-benefit/cost-benefit.entity';

@Entity({ name: "icd_20" })
export class Icd20Entity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date

  // relations
  @ManyToOne(
    type => CostBenefitEntity,
    e => e.icd20Id,
    { onDelete: "SET NULL" }
  )
  costBenefits: CostBenefitEntity[]
}