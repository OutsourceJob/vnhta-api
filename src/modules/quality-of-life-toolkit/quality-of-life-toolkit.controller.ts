import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SerializerInterceptor } from '../../serialization/serializer.interceptor';
import { QualityOfLifeToolkitEntity } from './quality-of-life-toolkit.entity';
import { QualityOfLifeToolkitService } from './quality-of-life-toolkit.service';
import { WriteQualityOfLifeToolkitDTO } from './quality-of-life-toolkit.dto';

@Crud({
  model: {
    type: QualityOfLifeToolkitEntity,
  },
  dto: {
    create: WriteQualityOfLifeToolkitDTO,
    update: WriteQualityOfLifeToolkitDTO,
  },
})
@Controller('quality-of-life-toolkits')
@UseInterceptors(SerializerInterceptor)
export class QualityOfLifeToolkitController
  implements CrudController<QualityOfLifeToolkitEntity> {
  constructor(public service: QualityOfLifeToolkitService) {}
}
