export class CreateArticleDTO {
  accountId: number;
  title: string;
  authorIdArray: Array<number>;
  journalIdArray: Array<number>;
  vol: number;
  issue: number;
  page: number;
  year: number;
}

export class UpdateArticleDTO {
  accountId: number;
  title: string;
  authorIdArray: Array<number>;
  journalIdArray: Array<number>;
  vol: number;
  issue: number;
  page: number;
  year: number;
}