import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { AccountEntity } from 'src/modules/account/account.entity';

@Entity({ name: "author" })
export class AuthorEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => AccountEntity,
    {
      onDelete: "SET NULL"
    }
  )
  @JoinColumn({ name: "account_id" })
  @Column({ name: "account_id", nullable: true })
  accountId: number;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  abbreviation: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date
}