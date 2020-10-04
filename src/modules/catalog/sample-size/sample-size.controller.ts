import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SerializerInterceptor } from '../../../serialization/serializer.interceptor';
import { SampleSizeEntity } from './sample-size.entity';
import { SampleSizeService } from './sample-size.service';
import { WriteSampleSizeDTO } from './sample-size.dto';

@Crud({
  model: {
    type: SampleSizeEntity,
  },
  dto: {
    create: WriteSampleSizeDTO,
    update: WriteSampleSizeDTO,
  },
})
@Controller('sampling-sizes')
@UseInterceptors(SerializerInterceptor)
export class SampleSizeController implements CrudController<SampleSizeEntity> {
  constructor(public service: SampleSizeService) { }
}
