import * as _ from "lodash";

export interface Pagination {
  limit?: any;
  offset?: any;
}

export const paginate = (data: Array<any>, pagination: Pagination) => {
  const limit = parseInt(pagination.limit, 10)
  const offset = parseInt(pagination.offset, 10)

  if (offset && limit) return _.slice(data, offset, offset + limit)
  if (offset && !limit) return _.slice(data, offset)
  if (!offset && limit) return _.slice(data, 0, limit)
}