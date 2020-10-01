
export interface JsonApiResource {
  id: number;
  attributes: any;
  meta: ObjectMeta;
}

export interface JsonApiCollection {
  data: Array<JsonApiResource> | Array<any>;
  meta: CollectionMeta;
}

export interface ObjectMeta {
  createdAt: Date;
  updatedAt: Date;
}

export interface CollectionMeta {
  count: number;
  totalPages: number;
  limit: number | null;
  skip: number;
}