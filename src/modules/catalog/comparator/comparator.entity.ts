import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: "comparator" })
export class ComparatorEntity extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   name: string;

   @CreateDateColumn({ name: "created_at" })
   createdAt: Date

   @UpdateDateColumn({ name: "updated_at" })
   updatedAt: Date
}