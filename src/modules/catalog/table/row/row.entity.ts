import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { VarEntity } from '../var/var.entity';
import { TableEntity } from '../table.entity';
import { PicoType } from '../../../../interfaces/index';

@Entity({ name: "row" })
export class RowEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => TableEntity,
    { onDelete: "CASCADE" }
  )
  @JoinColumn({ name: "table_id" })
  @Column({ name: "table_id", nullable: true })
  tableId: number;

  @ManyToOne(
    type => VarEntity,
    { onDelete: "SET NULL" }
  )
  @JoinColumn({ name: "var_id" })
  @Column({ name: "var_id", nullable: true })
  varId: number;

  @Column({ name: "pico_type", nullable: true })
  picoType: PicoType;

  @Column({ name: "pico_id", nullable: true })
  picoId: number;


  @Column({ nullable: true })
  name: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date
}