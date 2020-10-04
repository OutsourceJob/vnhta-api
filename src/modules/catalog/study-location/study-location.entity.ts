import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { CostBenefitEntity } from '../../article/cost-benefit/cost-benefit.entity';

@Entity({ name: "study_location" })
export class StudyLocationEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date

  // relation
  @ManyToMany(
    type => CostBenefitEntity
  )
  @JoinTable({ name: "cost_benefit_study_location" })
  costBenefits: CostBenefitEntity[]
}