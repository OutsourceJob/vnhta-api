import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SerializerInterceptor } from '../../../serialization/serializer.interceptor';
import { SamplingMethodEntity } from './sampling-method.entity';
import { SamplingMethodService } from './sampling-method.service';
import { WriteSamplingMethodDTO } from './sampling-method.dto';

@Crud({
  model: {
    type: SamplingMethodEntity,
  },
  dto: {
    create: WriteSamplingMethodDTO,
    update: WriteSamplingMethodDTO,
  },
})
@Controller('sampling-methods')
@UseInterceptors(SerializerInterceptor)
export class SamplingMethodController
  implements CrudController<SamplingMethodEntity> {
  constructor(public service: SamplingMethodService) { }
}