import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as _ from "lodash";
import { JsonApiResource, JsonApiCollection } from './serializer.interface';
import { paginate } from 'src/utils/paginate';

@Injectable()
export class SerializerInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const [request] = ctx.getArgs()
    return next
      .handle()
      .pipe(
        switchMap(response => {
          if (!response) return of(response)

          if (_.isArray(response)) return [this.serializeCollection(response, request)]
          return [this.serializeResource(response)]
        })
      );
  }

  serializeResource(response: any): JsonApiResource {
    return {
      id: response.id,
      attributes: _.omit(response, ["id", "password", "createdAt", "updatedAt", "pin", "pinCreatedAt"]),
      meta: {
        createdAt: response.createdAt,
        updatedAt: response.updatedAt
      }
    }
  }

  serializeCollection(response: Array<any>, request?: any): JsonApiCollection {
    const limit = parseInt(_.get(request, "query.limit"), 10)
    const offset = parseInt(_.get(request, "query.offset"), 10)

    if (request._parsedUrl.pathname.indexOf("articles") === -1) return {
      meta: {
        count: response.length,
        totalPages: 1,
        limit: 0,
        skip: 0
      },
      data: _.map(response, resource => this.serializeResource(resource))
    }

    const res = paginate(response, { limit, offset })

    return {
      meta: {
        count: res.length,
        totalPages: limit ? _.ceil(response.length / limit) : 1,
        limit: limit || 0,
        skip: offset || 0
      },
      data: _.map(res, resource => this.serializeResource(resource))
    }
  }
}
