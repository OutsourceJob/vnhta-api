import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as _ from "lodash";
import { JsonApiResource, JsonApiCollection } from './serializer.interface';

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
      attributes: _.omit(response, ["id", "password", "createdAt", "updatedAt"]),
      meta: {
        createdAt: response.createdAt,
        updatedAt: response.updatedAt
      }
    }
  }

  serializeCollection(response: Array<any>, request?: any): JsonApiCollection {
    const limit = parseInt(_.get(request, "query.limit"), 10)
    const offset = parseInt(_.get(request, "query.offset"), 10)

    return {
      meta: {
        count: response.length,
        totalPages: _.ceil(response.length / limit),
        limit: limit || 0,
        skip: offset || 0
      },
      data: _.map(response, resource => this.serializeResource(resource))
    }
  }
}
