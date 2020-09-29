import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, OneToMany, BaseEntity } from 'typeorm';
import { CollectionStatus } from '../../interfaces';
import { cleanAccents, removeSpecialCharacters } from '../../utils/handleString';
import * as _ from "lodash"
import { ArticleEntity } from '../article/article.entity';
import { CollectionImage } from 'src/interfaces';

@Entity({ name: "collection" })
export class CollectionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  title: string;

  @Column({ name: "en_title" })
  enTitle: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  slug: string;

  @Column({ nullable: true, name: "en_slug" })
  enSlug: string;

  @Column({ type: "json", name: "image_urls" })
  imageUrls: CollectionImage

  @Column()
  status: string = CollectionStatus.Draft;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date

  // relation
  @OneToMany(type => ArticleEntity, e => e.collectionId, {
    cascade: true
  })
  articles: ArticleEntity[]

  @BeforeInsert()
  @BeforeUpdate()
  generateSlugFromName() {
    this.slug = _.chain(this.title)
      .thru(cleanAccents)
      .thru(removeSpecialCharacters)
      .toLower()
      .split(" ")
      .concat(Date.now().toString())
      .join("-")
      .value()

    this.enSlug = _.chain(this.enTitle)
      .thru(cleanAccents)
      .thru(removeSpecialCharacters)
      .toLower()
      .split(" ")
      .concat(Date.now().toString())
      .join("-")
      .value()
  }
}