import { CostEffectivenessEntity } from 'src/modules/article/cost-effectiveness/cost-effectiveness.entity';
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity({ name: "cost_component" })
export class CostComponentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  // Relation
  // @OneToMany(
  //   type => CostEffectivenessEntity,
  //   c => c.costComponentIdArray,
  //   { onDelete: "SET NULL" }
  // )
  // costEffectiveness: CostEffectivenessEntity[];
}