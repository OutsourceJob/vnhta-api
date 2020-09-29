import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, BaseEntity, ManyToOne } from 'typeorm';
import { ArticleEntity } from '../article/article.entity';
import { VersionContent } from 'src/interfaces';

@Entity({ name: "version" })
export class VersionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => ArticleEntity, article => article.versions, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "article_id" })
  articleId: number;

  @Column()
  title: string;

  @Column({ type: "json" })
  content: VersionContent;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
