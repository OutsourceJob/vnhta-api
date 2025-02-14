import { AccountType, Gender } from '../../interfaces/index';
import {
  BaseEntity, Entity,
  PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BeforeInsert, BeforeUpdate, Exclusion
} from "typeorm";
import * as bcrypt from "bcrypt";
import { ArticleEntity } from '../article/article.entity';
import { Exclude } from "class-transformer";
import * as _ from "lodash";

@Entity({ name: "account" })
export class AccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: String;

  @Column({ name: "account_type" })
  accountType: string = AccountType.Member;

  @Column({ name: "full_name" })
  fullName: string;

  @Column()
  gender: Gender;

  @Column({ nullable: true })
  birthday: Date;

  @Column()
  job: string;

  @Column({ name: "academic_rank" })
  academicRank: string;

  @Column()
  degree: string;

  @Column()
  company: string;

  @Column()
  position: string;

  @Column()
  isActive: boolean = false;

  @Exclude()
  @Column()
  pin: string;

  @Exclude()
  @Column({ name: "pin_created_at", nullable: true })
  pinCreatedAt: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  // relations
  @OneToMany(type => ArticleEntity, e => e.accountId, {
    cascade: true
  })
  articles: ArticleEntity[]

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  }

  constructor(partial: Partial<AccountEntity>) {
    super();
    _.assign(this, partial);
  }
} 