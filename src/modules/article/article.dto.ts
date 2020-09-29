import { IsNotEmpty, IsEmpty } from 'class-validator';
import { ArticleType, Language } from '../../interfaces/index';

export enum ArticleStatus {
  Draft = "Draft",
  Published = "Published",
  Modified = "Modified"
}

// Create
export class CreateArticleDTO {
  @IsNotEmpty()
  userId: number;

  title: string;

  imageUrl: string;

  @IsEmpty()
  status: ArticleStatus.Draft;

  @IsEmpty()
  slug: string;

  description: string;

  content: string;

  type: ArticleType

  language: Language
}

// Update
export class UpdateArticleDTO {
  @IsEmpty()
  userId: number;

  title: string;

  imageUrl: string;

  @IsEmpty()
  status: ArticleStatus.Draft;

  @IsEmpty()
  slug: string;

  description: string;

  content: string;

  type: ArticleType
}

