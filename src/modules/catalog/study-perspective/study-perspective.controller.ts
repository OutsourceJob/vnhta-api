import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from "@nestjsx/crud";
import { StudyPerspectiveEntity } from './study-perspective.entity';
import { StudyPerspectiveService } from './study-perspective.service';
import { SerializerInterceptor } from '../../../serialization/serializer.interceptor';
import { WriteStudyPerspectiveDTO } from './study-perspective.dto';

@Crud({
  model: {
    type: StudyPerspectiveEntity
  },
  dto: {
    create: WriteStudyPerspectiveDTO,
    update: WriteStudyPerspectiveDTO
  }
})
@Controller("/study-perspectives")
@UseInterceptors(SerializerInterceptor)
export class StudyPerspectiveController {
  constructor(public service: StudyPerspectiveService) { }
}
