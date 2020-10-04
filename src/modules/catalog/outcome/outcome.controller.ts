import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { OutcomeEntity } from './outcome.entity';
import { OutcomeService } from './outcome.service';
import { SerializerInterceptor } from '../../../serialization/serializer.interceptor';
import { WriteOutcomeDTO } from './outcome.dto';

@Crud({
  model: {
    type: OutcomeEntity,
  },
  dto: {
    create: WriteOutcomeDTO,
    update: WriteOutcomeDTO,
  },
})
@Controller('outcomes')
@UseInterceptors(SerializerInterceptor)
export class OutcomeController {
  constructor(public service: OutcomeService) { }
}
