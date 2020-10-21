import { CostBenefitEntity } from 'src/modules/article/cost-benefit/cost-benefit.entity';
import { CostEffectivenessEntity } from 'src/modules/article/cost-effectiveness/cost-effectiveness.entity';
import { QualityOfLifeEntity } from 'src/modules/article/quality-of-life/quality-of-life.entity';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn, OneToMany
} from 'typeorm';


@Entity({ name: 'data_collecting_method' })
export class DataCollectingMethodEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // relations
  qualityOfLives: QualityOfLifeEntity[];

  costBenefits: CostBenefitEntity[];

  costEffectiveness: CostEffectivenessEntity[];
}
