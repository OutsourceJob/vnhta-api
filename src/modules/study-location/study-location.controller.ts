import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from "@nestjsx/crud";
import { StudyLocationEntity } from './study-location.entity';
import { StudyLocationService } from './study-location.service';
import { SerializerInterceptor } from '../../serialization/serializer.interceptor';
import { WriteStudyLocationDTO } from './study-location.dto';

@Crud({
  model: {
    type: StudyLocationEntity
  },
  dto: {
    create: WriteStudyLocationDTO,
    update: WriteStudyLocationDTO
  }
})
@Controller("/study-locations")
@UseInterceptors(SerializerInterceptor)
export class StudyLocationController {
  constructor(public service: StudyLocationService) { }
}
