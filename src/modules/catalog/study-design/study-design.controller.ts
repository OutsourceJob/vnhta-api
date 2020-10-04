import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SerializerInterceptor } from '../../../serialization/serializer.interceptor';
import { StudyDesignEntity } from './study-design.entity';
import { StudyDesignService } from './study-design.service';
import { WriteStudyDesignDTO } from './study-design.dto';

@Crud({
  model: {
    type: StudyDesignEntity,
  },
  dto: {
    create: WriteStudyDesignDTO,
    update: WriteStudyDesignDTO,
  },
})
@Controller('/study-designs')
@UseInterceptors(SerializerInterceptor)
export class StudyDesignController
  implements CrudController<StudyDesignEntity> {
  constructor(public service: StudyDesignService) { }
}
