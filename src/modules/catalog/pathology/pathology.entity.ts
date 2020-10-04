import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { CostBenefitEntity } from '../../article/cost-benefit/cost-benefit.entity';
import { QualityOfLifeEntity } from 'src/modules/article/quality-of-life/quality-of-life.entity';

@Entity({ name: 'pathology' })
export class PathologyEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  abbreviation: string;

  @OneToMany(
    type => CostBenefitEntity,
    e => e.pathologyId,
    { onDelete: "SET NULL" }
  )
  costBenefits: CostBenefitEntity[]

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(
    type => QualityOfLifeEntity,
    q => q.pathologyId,
    {
      cascade: true,
    },
  )
  qualityOfLives: QualityOfLifeEntity[];
}