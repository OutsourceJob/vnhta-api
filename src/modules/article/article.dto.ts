export class WriteArticleDTO {
  accountId: number;
  title: string;
  authorIdArray: Array<number>;
  journalId: number;
  // journalIdArray: Array<number>;
  vol: number;
  issue: number;
  number: number;
  startPage: number;
  endPage: number;
  year: number;
}