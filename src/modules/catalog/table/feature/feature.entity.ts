import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: "feature" })
export class FeatureEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  parameterId: number;

  varId: number;

  @Column({ nullable: true })
  value: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date
}