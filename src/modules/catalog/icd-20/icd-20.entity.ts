import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { CostBenefitEntity } from '../../article/cost-benefit/cost-benefit.entity';
import { QualityOfLifeEntity } from 'src/modules/article/quality-of-life/quality-of-life.entity';
import { CostEffectivenessEntity } from 'src/modules/article/cost-effectiveness/cost-effectiveness.entity';

@Entity({ name: 'icd_20' })
export class Icd20Entity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date

  // relations
  // @OneToMany(
  //   type => CostBenefitEntity,
  //   e => e.icd20Id,
  //   { onDelete: "SET NULL" }
  // )
  // costBenefits: CostBenefitEntity[]

  // @OneToMany(
  //   type => QualityOfLifeEntity,
  //   q => q.icd20Id,
  //   {
  //     onDelete: "SET NULL"
  //   },
  // )
  // qualityOfLives: QualityOfLifeEntity[];

  // @OneToMany(
  //   type => CostEffectivenessEntity,
  //   c => c.icd20Id,
  //   { onDelete: "SET NULL" }
  // )
  // costEffectiveness: CostEffectivenessEntity[];
}
