import { CostEffectivenessEntity } from "src/modules/article/cost-effectiveness/cost-effectiveness.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "effectiveness_type" })
export class EffectivenessTypeEntity extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   name: string;

   @CreateDateColumn({ name: "created_at" })
   createdAt: Date;

   @UpdateDateColumn({ name: "updated_at" })
   updatedAt: Date;

   // relations
   costEffectiveness: CostEffectivenessEntity[];
}