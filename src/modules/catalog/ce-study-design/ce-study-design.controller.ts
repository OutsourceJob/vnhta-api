import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SerializerInterceptor } from '../../../serialization/serializer.interceptor';
import { CEStudyDesignEntity } from './ce-study-design.entity';
import { CEStudyDesignService } from './ce-study-design.service';
import { WriteCEStudyDesignDTO } from './ce-study-design.dto';

@Crud({
  model: {
    type: CEStudyDesignEntity,
  },
  dto: {
    create: WriteCEStudyDesignDTO,
    update: WriteCEStudyDesignDTO,
  },
})
@Controller('/ce-study-designs')
@UseInterceptors(SerializerInterceptor)
export class CEStudyDesignController
  implements CrudController<CEStudyDesignEntity> {
  constructor(public service: CEStudyDesignService) { }
}
