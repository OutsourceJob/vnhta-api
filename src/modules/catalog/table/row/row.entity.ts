import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { VarEntity } from '../var/var.entity';
import { TableEntity } from '../table.entity';

@Entity({ name: "row" })
export class RowEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => TableEntity
  )
  @JoinColumn({ name: "table_id" })
  @Column({ name: "table_id", nullable: true })
  tableId: number;

  @ManyToOne(
    type => VarEntity
  )
  @JoinColumn({ name: "var_id" })
  @Column({ name: "var_id", nullable: true })
  varId: number;

  @Column({ nullable: true })
  name: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date
}