import {
  Entity, BaseEntity, PrimaryGeneratedColumn,
  Column, CreateDateColumn, UpdateDateColumn,
  BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn
} from "typeorm";
import * as _ from "lodash";
import { cleanAccents, removeSpecialCharacters } from "../../utils/handleString";
import { ArticleStatus } from "../../interfaces"

@Entity({
  name: "article"
})
export class ArticleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_id" })
  userId: number;

  @Column({ nullable: true })
  title: string;

  @Column({
    name: "status"
  })
  status: ArticleStatus = ArticleStatus.Unverified;

  @Column({ nullable: true })
  slug: string;

  @Column({ type: "json" })
  authors: string[] = [];

  @Column({ name: "journal_id" })
  journalId: number;

  @Column()
  vol: number;

  @Column()
  issue: number;

  @Column()
  page: number;

  @Column()
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