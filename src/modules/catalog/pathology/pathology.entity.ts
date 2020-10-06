import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { CostBenefitEntity } from '../../article/cost-benefit/cost-benefit.entity';
import { QualityOfLifeEntity } from 'src/modules/article/quality-of-life/quality-of-life.entity';
import { CostEffectivenessEntity } from 'src/modules/article/cost-effectiveness/cost-effectiveness.entity';

@Entity({ name: 'pathology' })
export class PathologyEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  abbreviation: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relation
  @OneToMany(
    type => CostBenefitEntity,
    e => e.pathologyId,
    { onDelete: "SET NULL" }
  )
  costBenefits: CostBenefitEntity[]

  @OneToMany(
    type => QualityOfLifeEntity,
    q => q.pathologyId,
    {
      onDelete: "SET NULL"
    },
  )
  qualityOfLives: QualityOfLifeEntity[];

  @OneToMany(
    type => CostEffectivenessEntity,
    c => c.pathologyId,
    { onDelete: "SET NULL" }
  )
  costEffectiveness: CostEffectivenessEntity[];
}