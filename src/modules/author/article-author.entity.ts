import { Entity, BaseEntity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: "article_author" })
export class ArticleAuthorEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}