import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from "@nestjsx/crud";
import * as _ from "lodash";
import { ComparatorEntity } from './comparator.entity';
import { WriteComparatorDTO } from './comparator.dto';
import { ComparatorService } from './comparator.service';
import { SerializerInterceptor } from '../../../serialization/serializer.interceptor';

@UseInterceptors(SerializerInterceptor)
@Crud({
   model: {
      type: ComparatorEntity
   },
   dto: {
      create: WriteComparatorDTO,
      update: WriteComparatorDTO
   }
})
@Controller("comparators")
export class ComparatorController {
   constructor(
      public service: ComparatorService
   ) { }
}