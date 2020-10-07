import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Vartype } from '../../../../interfaces/index';

@Entity({ name: "var_group" })
export class VarGroupEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "var" })
  name: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date
}