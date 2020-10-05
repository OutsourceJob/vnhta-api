import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { CostEffectivenessEntity } from 'src/modules/article/cost-effectiveness/cost-effectiveness.entity';

@Entity({ name: 'uncertainty_analysis' })
export class UncertaintyAnalysisEntity extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   name: string;

   @CreateDateColumn({ name: 'created_at' })
   createdAt: Date;

   @UpdateDateColumn({ name: "updated_at" })
   updatedAt: Date;

   // Relation
   costEffectiveness: CostEffectivenessEntity[];
}
