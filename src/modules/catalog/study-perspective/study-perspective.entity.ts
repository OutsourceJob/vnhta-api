import { CostEffectivenessEntity } from 'src/modules/article/cost-effectiveness/cost-effectiveness.entity';
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity({ name: "study_perspective" })
export class StudyPerspectiveEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  // Relation
  // @OneToMany(
  //   type => CostEffectivenessEntity,
  //   c => c.studyPerspectiveId,
  //   { onDelete: "SET NULL" }
  // )
  // costEffectiveness: CostEffectivenessEntity[];
}