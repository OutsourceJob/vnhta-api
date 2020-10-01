import { AccountType } from '../../interfaces/index';
import {
  BaseEntity, Entity,
  PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BeforeInsert
} from "typeorm";
import * as bcrypt from "bcrypt";

@Entity({ name: "account" })
export class AccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: String;

  @Column({ name: "account_type" })
  accountType: string = AccountType.Admin;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  }
} 