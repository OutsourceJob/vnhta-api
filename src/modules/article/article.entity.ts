import {
  Entity, BaseEntity, PrimaryGeneratedColumn,
  Column, CreateDateColumn, UpdateDateColumn,
  BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn, OneToMany, OneToOne, ManyToMany, JoinTable
} from "typeorm";
import * as _ from "lodash";
import { cleanAccents, removeSpecialCharacters } from "../../utils/handleString";
import { ArticleStatus } from "../../interfaces"
import { AccountEntity } from '../account/account.entity';
import { AuthorEntity } from '../catalog/author/author.entity';
import { JournalEntity } from '../catalog/journal/journal.entity';
import { CostBenefitEntity } from './cost-benefit/cost-benefit.entity';
import { QualityOfLifeEntity } from './quality-of-life/quality-of-life.entity';
import { CostEffectivenessEntity } from "./cost-effectiveness/cost-effectiveness.entity";

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

  @ManyToMany(
    type => AuthorEntity
  )
  @JoinTable({
    name: "article_author",
    joinColumns: [{ name: "article_id" }],
    inverseJoinColumns: [{ name: "author_id" }]
  })
  authors: AuthorEntity[]

  @ManyToMany(
    type => JournalEntity
  )
  @JoinTable({
    name: "article_journal",
    joinColumns: [{ name: "article_id" }],
    inverseJoinColumns: [{ name: "journal_id" }]
  })
  journals: JournalEntity[]

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
  number: number;

  @Column({ nullable: true, name: "start_page" })
  startPage: number;

  @Column({ nullable: true, name: "end_page" })
  endPage: number;

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

  // relation
  @OneToOne(
    type => CostBenefitEntity,
    e => e.articleId
  )
  costBenefit: CostBenefitEntity;


  @OneToOne(
    type => QualityOfLifeEntity,
    e => e.articleId
  )
  qualityOfLife: QualityOfLifeEntity;

  @OneToOne(
    type => CostEffectivenessEntity,
    c => c.articleId
  )
  costEffectiveness: CostBenefitEntity;
}