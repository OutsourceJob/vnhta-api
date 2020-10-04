import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { DataCollectingMethodEntity } from './data-collecting-method.entity';
import { DataCollectingMethodService } from './data-collecting-method.service';
import { WriteDataCollectingMethodDTO } from './data-collecting-method.dto';
import { SerializerInterceptor } from '../../../serialization/serializer.interceptor';

@Crud({
  model: {
    type: DataCollectingMethodEntity,
  },
  dto: {
    create: WriteDataCollectingMethodDTO,
    update: WriteDataCollectingMethodDTO,
  },
})
@Controller('data-collecting-methods')
@UseInterceptors(SerializerInterceptor)
export class DataCollectingMethodController
  implements CrudController<DataCollectingMethodEntity> {
  constructor(public service: DataCollectingMethodService) { }
}
