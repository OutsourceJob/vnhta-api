import {
  Entity, BaseEntity, PrimaryGeneratedColumn,
  Column, CreateDateColumn, UpdateDateColumn,
  BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn, OneToMany, OneToOne
} from "typeorm";
import * as _ from "lodash";
import { cleanAccents, removeSpecialCharacters } from "../../utils/handleString";
import { ArticleStatus } from "../../interfaces"
import { AccountEntity } from '../account/account.entity';

@Entity({
  name: "article"
})
export class ArticleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => AccountEntity, e => e.articles, {
    onDelete: "SET NULL"
  })
  @JoinColumn({ name: "account_id" })
  accountId: number;

  @Column({ nullable: true })
  title: string;

  @Column({
    name: "status"
  })
  status: ArticleStatus = ArticleStatus.Unverified;

  @Column({ nullable: true })
  slug: string;

  @Column({ nullable: true })
  vol: number;

  @Column({ nullable: true })
  issue: number;

  @Column({ nullable: true })
  page: number;

  @Column({ nullable: true })
  year: number;

  @CreateDateColumn({
    name: "created_at"
  })
  createdAt: Date

  @UpdateDateColumn({
    name: "updated_at"
  })
  updatedAt: Date;

  // hook
  @BeforeInsert()
  @BeforeUpdate()
  generateSlugFromName() {
    this.slug = this.title && _.chain(this.title)
      .thru(cleanAccents)
      .thru(removeSpecialCharacters)
      .toLower()
      .split(" ")
      .concat(Date.now().toString())
      .join("-")
      .value()
  }
}