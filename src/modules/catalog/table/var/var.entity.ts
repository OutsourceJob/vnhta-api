import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Vartype } from '../../../../interfaces/index';
import { VarGroupEntity } from '../var-group/var-group.entity';

@Entity({ name: "var" })
export class VarEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => VarGroupEntity
  )
  @JoinColumn({ name: "var_group_id" })
  @Column({ name: "var_group_id", nullable: true })
  varGroupId: number;

  @Column({})
  name: string;

  @Column({ name: "type" })
  type: Vartype

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date
}