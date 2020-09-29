import { CollectionStatus } from '../../interfaces/index';
import { CollectionImage } from 'src/interfaces';
export class CreateCollectionDTO {
  title: string;
  enTitle: string;

  description: string;

  code: string;

  slug?: string;
  enSlug?: string;

  imageUrls: CollectionImage

  status: CollectionStatus
}

export class UpdateCollectionDTO {

}