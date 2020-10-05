import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { CostBenefitEntity } from '../../article/cost-benefit/cost-benefit.entity';
import { CostEffectivenessEntity } from 'src/modules/article/cost-effectiveness/cost-effectiveness.entity';
import { QualityOfLifeEntity } from 'src/modules/article/quality-of-life/quality-of-life.entity';

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
  costBenefits: CostBenefitEntity[];

  costEffectiveness: CostEffectivenessEntity[];

  qualityOfLives: QualityOfLifeEntity[];
}