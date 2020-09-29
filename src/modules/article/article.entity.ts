import {
  Entity, BaseEntity, PrimaryGeneratedColumn,
  Column, CreateDateColumn, UpdateDateColumn,
  BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn
} from "typeorm";
import { ArticleStatus } from '../../interfaces';
import * as _ from "lodash";
import { cleanAccents, removeSpecialCharacters } from "../../utils/handleString";
import { OneToMany, getConnection } from 'typeorm';
import { ArticleType, Language } from '../../interfaces/index';
import { VersionEntity } from '../version/version.entity';

@Entity({
  name: "article"
})
export class ArticleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(type => UserEntity, user => user.articles, {
  //   onDelete: "SET NULL"
  // })
  @Column({ name: "user_id" })
  userId: number;

  // @ManyToOne(type => CollectionEntity, e => e.articles)
  @Column({ name: "collection_id", nullable: true })
  collectionId: number;

  @Column({ nullable: true })
  title: string;

  @Column({
    name: "image_url",
    nullable: true
  })
  imageUrl: string;

  @Column({
    name: "status"
  })
  status: ArticleStatus = ArticleStatus.Draft;

  @Column({ nullable: true })
  slug: string;

  @Column()
  type: ArticleType = ArticleType.Normal;

  @Column("longtext")
  content: string = "Title here"

  @Column("longtext")
  description: string = ""

  @Column({ name: "coin_id", nullable: true })
  coinId: number

  @CreateDateColumn({
    name: "created_at"
  })
  createdAt: Date

  @UpdateDateColumn({
    name: "updated_at"
  })
  updatedAt: Date;

  @OneToMany(type => VersionEntity, version => version.articleId, {
    cascade: true
  })
  versions: VersionEntity[]

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