import { ArticleEntity } from '../modules/article/article.entity';

export enum CollectionStatus {
  Draft = "Draft",
  Published = "Published",
}

export enum ArticleStatus {
  Template = "Template",
  Draft = "Draft",
  Published = "Published",
  Modified = "Modified"
}

export enum UserType {
  Admin = "Admin",
  Collaborator = "Collaborator"
}

export interface VersionContent {
  article: ArticleEntity;
}

export enum ArticleType {
  Normal = "Normal",
  Template = "Template"
}

export enum FileType {
  image = "image",
  table = "table"
}

export interface CollectionImage {
  notOnClickWhiteUrl: string;
  notOnClickDarkUrl: string;
  onClickWhiteUrl: string;
  onClickDarkUrl: string;
}

export enum Language {
  English = "English",
  Vietnamese = "Vietnamese"
}

