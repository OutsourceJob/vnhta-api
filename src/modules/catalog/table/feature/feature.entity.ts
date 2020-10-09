import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TableEntity } from '../table.entity';
import { ParameterEntity } from '../parameter/parameter.entity';
import { VarEntity } from '../var/var.entity';
import { RowEntity } from '../row/row.entity';

@Entity({ name: "feature" })
export class FeatureEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => RowEntity,
    { onDelete: "CASCADE" }
  )
  @JoinColumn({ name: "row_id" })
  @Column({ name: "row_id" })
  rowId: number;

  // @ManyToOne(
  //   type => ParameterEntity,
  //   { onDelete: "SET NULL" }
  // )
  // @JoinColumn({ name: "parameter_id" })
  @Column({ name: "parameter_id", nullable: true })
  parameterId: number;

  @Column({ nullable: true, type: "float" })
  value: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date
}