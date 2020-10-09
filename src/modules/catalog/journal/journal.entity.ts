import { ArticleEntity } from 'src/modules/article/article.entity';
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity({ name: "journal" })
export class JournalEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  abbreviation: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(type => ArticleEntity, a => a.journalId, {
    onDelete: "SET NULL"
  })
  articles: ArticleEntity[];
}