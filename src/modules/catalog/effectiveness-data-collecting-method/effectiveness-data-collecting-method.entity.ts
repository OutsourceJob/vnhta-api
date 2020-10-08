import { CostEffectivenessEntity } from 'src/modules/article/cost-effectiveness/cost-effectiveness.entity';
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'effectiveness_data_collecting_method' })
export class EffectivenessDataCollectingMethodEntity extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   name: string;

   @CreateDateColumn({ name: 'created_at' })
   createdAt: Date;

   @UpdateDateColumn({ name: "updated_at" })
   updatedAt: Date;

   // Relation
   // @OneToMany(
   //    type => CostEffectivenessEntity,
   //    c => c.effectivenessDataCollectingMethodId,
   //    { onDelete: "SET NULL" }
   // )
   // costEffectiveness: CostEffectivenessEntity[];
}
