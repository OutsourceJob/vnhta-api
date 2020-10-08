import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CostEffectivenessEntity } from 'src/modules/article/cost-effectiveness/cost-effectiveness.entity';

@Entity({ name: 'outcome' })
export class OutcomeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relation
  // costEffectiveness: CostEffectivenessEntity[];
}
