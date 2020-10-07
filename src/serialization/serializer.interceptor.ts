import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as _ from "lodash";
import { JsonApiResource, JsonApiCollection } from './serializer.interface';

@Injectable()
export class SerializerInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        switchMap(response => {
          if (!response) return of(response)

          if (_.isArray(response)) return [this.serializeCollection(response)]
          return [this.serializeResource(response)]
        })
      );
  }

  serializeResource(response: any): JsonApiResource {
    return {
      id: response.id,
      attributes: _.omit(response, ["id"]),
      meta: {
        createdAt: response.createdAt,
        updatedAt: response.updatedAt
      }
    }
  }

  serializeCollection(response: Array<any>): JsonApiCollection {
    return {
      meta: {
        count: response.length,
        totalPages: 1,
        limit: null,
        skip: 0
      },
      data: _.map(response, resource => this.serializeResource(resource))
    }
  }
}
