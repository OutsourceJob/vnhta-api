import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from "@nestjsx/crud";
import { FeatureEntity } from './feature.entity';
import { FeatureService } from './feature.service';
import { SerializerInterceptor } from '../../../../serialization/serializer.interceptor';
import { WriteFeatureDTO } from './feature.dto';

@Crud({
  model: {
    type: FeatureEntity
  },
  dto: {
    create: WriteFeatureDTO,
    update: WriteFeatureDTO
  }
})
@Controller("/features")
@UseInterceptors(SerializerInterceptor)
export class FeatureController {
  constructor(public service: FeatureService) { }
}
